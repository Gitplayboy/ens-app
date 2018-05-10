import gql from 'graphql-tag'
import get from 'lodash/get'
import set from 'lodash/set'
import { getMode } from '../registrar'

const defaults = {}

const modeNames = [
  'Open',
  'Auction',
  'Owned',
  'Forbidden',
  'Reveal',
  'NotYetAvailable'
]

const resolvers = {
  Mutation: {
    getDomainState: async (_, { name }, { cache }) => {
      const state = await getMode(name)

      return {
        name,
        state: modeNames[state],
        __typename: 'NodeState'
      }
    }
  }
}

export default resolvers

export { defaults }
