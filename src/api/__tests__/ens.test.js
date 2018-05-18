/**
 * @jest-environment node
 */
import fs from 'fs'
import solc from 'solc'
import TestRPC from 'ganache-cli'
import { setupWeb3, getAccounts } from '../web3'
import {
  getOwner,
  getResolver,
  getAddr,
  setAddr,
  getContent,
  setContent
} from '../registry'
import getENS from '../ens'
import '../../testing-utils/extendExpect'

let ens = null
let ensRoot = null
let deployens = null
let web3Instance = null

beforeAll(async () => {
  const provider = TestRPC.provider()
  const { web3 } = await setupWeb3(provider)

  const accounts = await getAccounts()

  expect(accounts.length).toBeGreaterThan(0)

  let source = fs.readFileSync('./src/api/__tests__/ens.sol').toString()
  let compiled = solc.compile(source, 1)
  let deployer = compiled.contracts[':DeployENS']
  let deployensContract = web3.eth.contract(JSON.parse(deployer.interface))

  // Deploy the contract
  deployens = await new Promise((resolve, reject) => {
    deployensContract.new(
      {
        from: accounts[0],
        data: deployer.bytecode,
        gas: 4700000
      },
      (err, contract) => {
        if (err) {
          reject(err)
        }
        if (contract.address !== undefined) {
          resolve(contract)
        }
      }
    )
  })

  // Fetch the address of the ENS registry
  ensRoot = await new Promise((resolve, reject) => {
    deployens.ens.call((err, value) => {
      expect(err).toBe(null)
      resolve(value)
      //done()
    })
  })

  //setup ENS
  await getENS(ensRoot)
}, 30000)

describe('Test contract and Web3 setup', () => {
  test('accounts exist', async () => {
    const accounts = await getAccounts()
    expect(accounts.length).toBeGreaterThan(0)
  })

  test('ens deployed and setup with dummy data', async () => {
    const { ENS } = await getENS()
    const addr = await ENS.resolver('foo.eth').resolverAddress()
    expect(addr).not.toBe('0x0000000000000000000000000000000000000000')
  })
})

describe('Registry', () => {
  test('getOwner returns owner', async () => {
    const owner = await getOwner('foo.eth')
    const accounts = await getAccounts()
    expect(owner).toEqual(deployens.address)
  })

  test('getResolver returns a resolver address', async () => {
    const resolver = await getResolver('foo.eth')
    expect(resolver).toBeHex()
    expect(resolver).toBeEthAddress()
    expect(resolver).not.toBe('0x0000000000000000000000000000000000000000')
  })
})

describe('Resolver', () => {
  test('getAddr returns an address', async () => {
    const addr = await getAddr('foo.eth')
    expect(addr).toBeHex()
    expect(addr).toBeEthAddress()
    expect(addr).not.toBe('0x0000000000000000000000000000000000000000')
  })

  test('getAddr throws if no addr is present', async () => {
    await getAddr('bar.eth').catch(err => {
      expect(err).toMatchSnapshot()
    })
  })

  test('setAddr sets an address', async () => {
    //reverts if no addr is present
    await setAddr('bar.eth', '0x12345')
    const addr = await getAddr('bar.eth')
    console.log(addr)
    expect(addr).toBe('0x0000000000000000000000000000000000012345')
  })

  test('getContent returns a 32 byte hash', async () => {
    const content = await getContent('foo.eth')
    console.log('')
    expect(content).toBeHex()
    expect(content).toMatchSnapshot()
  })

  test('setContent sets 32 byte hash', async () => {
    await setContent(
      'bar.eth',
      '0x736f6d65436f6e74656e74000000000000000000000000000000000000000000'
    )
    const content = await getContent('bar.eth')
    expect(content).toBeHex()
    expect(content).toMatchSnapshot()
  })
})
