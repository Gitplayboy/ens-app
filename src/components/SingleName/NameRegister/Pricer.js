import React from 'react'
import styled from '@emotion/styled'
import { Query } from 'react-apollo'

import { GET_MINIMUM_COMMITMENT_AGE, GET_RENT_PRICE } from 'graphql/queries'

import Years from './Years'
import Price from './Price'

import mq from 'mediaQuery'

import { ReactComponent as ChainDefault } from '../../Icons/chain.svg'
const PricingContainer = styled('div')`
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: 20px;
  ${mq.medium`
    grid-template-columns:
      minmax(min-content, 200px) minmax(min-content, min-content)
      minmax(200px, 1fr);
  `}
`
const Chain = styled(ChainDefault)`
  display: none;

  ${mq.medium`
    display: block;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
  `}
`

export default function Pricer({
  years,
  setYears,
  yearInSeconds,
  duration,
  ethUsdPriceLoading,
  ethUsdPrice,
  name
}) {
  return (
    <Query
      query={GET_RENT_PRICE}
      variables={{
        name,
        duration
      }}
    >
      {({ data, loading }) => {
        return (
          <PricingContainer>
            <Years
              years={years}
              setYears={setYears}
              yearInSeconds={yearInSeconds}
            />
            <Chain />
            <Price
              price={loading ? 0 : data.getRentPrice}
              ethUsdPriceLoading={ethUsdPriceLoading}
              ethUsdPrice={ethUsdPrice}
            />
          </PricingContainer>
        )
      }}
    </Query>
  )
}
