import ReactGA from 'react-ga'
import { getNetworkId } from '@ensdomains/ui'

const TrackingID = {
  live: 'UA-138903307-1',
  dev: 'UA-138903307-2'
}

function isProduction() {
  return window.location.host === 'app.ens.domains'
}

function isDev() {
  return window.location.host === 'ensappdev.surge.sh'
}

async function isMainnet() {
  const id = await getNetworkId()
  return id === 1
}

export const setup = () => {
  if (isProduction()) {
    ReactGA.initialize(TrackingID.live)
    ReactGA.plugin.require('ecommerce')
  } else if (isDev()) {
    ReactGA.initialize(TrackingID.dev)
    ReactGA.plugin.require('ecommerce', { debug: true })
    console.log('Analytics setup for dev with ', TrackingID.dev)
  }
}

export const pageview = () => {
  const page = window.location.pathname + window.location.search
  if (isProduction() || isDev()) {
    ReactGA.pageview(page)
  }
}

export const trackReferral = async ({
  labels, // labels array
  transactionId, //hash
  type, // renew/register
  price,
  referrer // in wei
}) => {
  const mainnet = await isMainnet()

  function track() {
    const campaignSource = ReactGA.ga('get', 'campaignSource')
    console.log('Referral from source: ', campaignSource)
    ReactGA.event({
      category: 'referral',
      action: `${type} domain`,
      labels,
      transactionId,
      type,
      referrer: campaignSource
    })
    ReactGA.plugin.execute('ecommerce', 'addTransaction', {
      id: transactionId, // Transaction ID. Required.
      affiliation: campaignSource, // Affiliation or store name.
      revenue: price // Grand Total.
    })

    labels.forEach(label => {
      ReactGA.plugin.execute('ecommerce', 'addItem', {
        id: transactionId,
        name: label,
        sku: label,
        category: type
      })
    })
    ReactGA.plugin.execute('ecommerce', 'send')
    ReactGA.plugin.execute('ecommerce', 'clear')
  }

  if (isProduction() && mainnet) {
    console.log('calling tracking from live')
    track()
    console.log('Completed tracking from live')
  } else if (isDev()) {
    console.log('calling tracking from dev')
    track()
    console.log('Completed tracking from dev')
  } else {
    console.log(
      'Referral triggered on local development',
      JSON.stringify({
        labels,
        transactionId,
        type,
        price,
        referrer
      })
    )
  }
}
