import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Loader from '../Loader'
import DomainItem from '../DomainItem/DomainItem'
import { H2 } from '../Typography/Basic'
import { GET_FAVOURITES } from '../../graphql/queries'

const GET_DOMAIN_STATE = gql`
  query getDomainState @client {
    domainState {
      name
      revealDate
      registrationDate
      value
      highestBid
      state
      owner
    }

    web3 {
      accounts
    }
  }
`

export const DomainInfo = ({ domainState, isFavourite }) => {
  if (!domainState) return null

  return <DomainItem domain={domainState} isFavourite={isFavourite} />
}

const DomainInfoContainer = () => {
  return (
    <Query query={GET_DOMAIN_STATE}>
      {({ data: { domainState }, loading }) => {
        return (
          <Query query={GET_FAVOURITES}>
            {({ data: { favourites } }) => (
              <Fragment>
                <H2>Top Level Domains</H2>
                {console.log(domainState, loading)}
                {loading ? (
                  <Fragment>
                    <Loader />
                  </Fragment>
                ) : (
                  <DomainInfo
                    domainState={domainState}
                    isFavourite={
                      favourites.filter(
                        domain => domain.name === domainState.name
                      ).length > 0
                    }
                  />
                )}
              </Fragment>
            )}
          </Query>
        )
      }}
    </Query>
  )
}

export default DomainInfoContainer
