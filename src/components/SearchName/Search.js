import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { validateName } from '../../lib/utils'
import { addressUtils } from '@0xproject/utils'
import '../../api/subDomainRegistrar'
import { SubDomainStateFields } from '../../graphql/fragments'

const GET_DOMAIN_STATE = gql`
  mutation getDomainAvailability($name: String) {
    getDomainAvailability(name: $name) @client {
      name
      state
    }
  }
`

const GET_SUBDOMAIN_AVAILABILITY = gql`
  mutation getSubDomainAvailability($name: String) {
    getSubDomainAvailability(name: $name) @client {
      ...SubDomainStateFields
    }
  }

  ${SubDomainStateFields}
`

export const parseSearchTerm = term => {
  if (term.indexOf('.') !== -1) {
    return 'name'
  } else if (addressUtils.isAddress(term)) {
    return 'address'
  } else {
    try {
      validateName(term)
      return 'search'
    } catch (e) {
      return 'invalid'
    }
  }
}

const Search = ({ getDomainState, getSubDomainAvailability }) => {
  let input
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        const name = input.value
        if (validateName(name)) {
          getDomainState({ variables: { name } })
          getSubDomainAvailability({ variables: { name } })
        } else {
          console.log('name is too short or has punctuation')
        }
      }}
    >
      <input ref={el => (input = el)} />
      <button type="submit">Check Availability</button>
    </form>
  )
}

const SearchContainer = ({ searchDomain }) => {
  return (
    <Mutation mutation={GET_SUBDOMAIN_AVAILABILITY}>
      {getSubDomainAvailability => (
        <Mutation mutation={GET_DOMAIN_STATE}>
          {getDomainState => (
            <Search
              getDomainState={getDomainState}
              getSubDomainAvailability={getSubDomainAvailability}
              searchDomain={searchDomain}
            />
          )}
        </Mutation>
      )}
    </Mutation>
  )
}

export { Search }

export default SearchContainer
