import React, { Component } from 'react'
import styled from 'react-emotion'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
//import { GET_WEB3 } from '../../graphql/queries'
import Loader from '../Loader'
import UnstyledBlockies from '../Blockies'

export const GET_WEB3 = gql`
  query web3 {
    web3 @client {
      accounts
      network
    }
  }
`

const NetworkInformationContainer = styled('div')`
  position: relative;
  padding-left: 40px;
  margin-bottom: 50px;
`

const Blockies = styled(UnstyledBlockies)`
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(-15px, 5px);
  box-shadow: 3px 5px 24px 0 #d5e2ec;
`

const NetworkStatus = styled('div')`
  color: #cacaca;
  font-size: 14px;
  text-transform: capitalize;
  font-weight: 100;
  margin-top: -2px;
  margin-left: 1px;
`

const Account = styled('div')`
  color: #adbbcd;
  font-size: 22px;
  font-weight: 200;
  width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

class NetworkInformation extends Component {
  render() {
    return (
      <Query query={GET_WEB3}>
        {({ data, loading }) => {
          if (loading) return <Loader />
          const {
            web3: { accounts, network }
          } = data
          return (
            <NetworkInformationContainer>
              <Blockies address={accounts[0]} imageSize={47} />
              <Account>{accounts[0]}</Account>
              <NetworkStatus>{network} network</NetworkStatus>
            </NetworkInformationContainer>
          )
        }}
      </Query>
    )
  }
}
export default NetworkInformation
