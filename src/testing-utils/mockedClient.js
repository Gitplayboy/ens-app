import typeDefs from '../api/schema'
import setupClient from './apollo-mock-client'

const defaultMocks = {
  Query: () => ({
    nodes: () => []
  }),
  Mutation: () => ({
    getDomainState: (_, { name }, context) => {
      return {
        name,
        state: 'Open'
      }
    }
  })
}

const createClient = setupClient(defaultMocks, typeDefs)

export default createClient
