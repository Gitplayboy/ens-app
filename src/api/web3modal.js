import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { setup as setupENS } from '../api/ens'
import { getProvider } from '@ensdomains/ui'
import Authereum from 'authereum'
import MewConnect from '@myetherwallet/mewconnect-web-client'
import Torus from '@toruslabs/torus-embed'
import Portis from '@portis/web3'

const INFURA_ID = '58a380d3ecd545b2b5b3dad5d2b18bf0'
const PORTIS_ID = '57e5d6ca-e408-4925-99c4-e7da3bdb8bf5'
const logo =
  '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'
let provider
const web3Modal = new Web3Modal({
  network: 'mainnet', // optional
  cacheProvider: true, // optional
  providerOptions: {
    injected: {
      display: {
        logo: `data:image/gif;base64, ${logo}`,
        name: 'Injected',
        description: 'eg: Metamask, Opera, Status.im'
      },
      package: null
    },
    walletconnect: {
      package: WalletConnectProvider,
      display: {
        description: ' '
      },
      options: {
        infuraId: INFURA_ID
      }
    },
    // Alphabetical order from now on.
    authereum: {
      package: Authereum,
      display: {
        description: ' '
      }
    },
    mewconnect: {
      package: MewConnect,
      display: {
        description: ' '
      },
      options: {
        infuraId: INFURA_ID,
        description: ' '
      }
    },
    portis: {
      package: Portis,
      display: {
        description: ' '
      },
      options: {
        id: PORTIS_ID
      }
    },
    torus: {
      package: Torus,
      display: {
        description: ' '
      }
    }
  }
})

export const connect = async () => {
  provider = await web3Modal.connect()
  let res = await setupENS({
    customProvider: provider,
    reloadOnAccountsChange: true,
    enforceReload: true
  })
}

export const disconnect = async function() {
  // Disconnect wallet connect provider
  if (provider && provider.disconnect) {
    provider.disconnect()
  }
  await setupENS({
    reloadOnAccountsChange: true,
    enforceReadOnly: true,
    enforceReload: true
  })
  await web3Modal.clearCachedProvider()
}
