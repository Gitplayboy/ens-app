/**
 * @jest-environment node
 */
import fs from 'fs'
import solc from 'solc'
import TestRPC from 'ganache-cli'
import { setupWeb3, getAccounts } from '../web3'
import getENS from '../ens'

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

test('accounts exist', async () => {
  const accounts = await getAccounts()
  expect(accounts.length).toBeGreaterThan(0)
})

test('ens deployed and setup with dummy data', async () => {
  const { ENS } = await getENS()
  const addr = await ENS.resolver('foo.eth').resolverAddress()
  expect(addr).not.toBe('0x0000000000000000000000000000000000000000')
})
