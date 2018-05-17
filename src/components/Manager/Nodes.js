import React from 'react'
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'
import { GET_SUBDOMAINS } from '../../graphql/mutations'
import { GET_NODES } from '../../graphql/queries'

const Node = ({ node: { owner, name, nodes = [] } }) => (
  <Mutation mutation={GET_SUBDOMAINS}>
    {getSubdomains => (
      <div>
        {name} - {owner}
        <button onClick={() => getSubdomains({ variables: { name } })} />
        <ul>{nodes.map(node => <Node node={node} />)}</ul>
      </div>
    )}
  </Mutation>
)

const Nodes = ({ nodes }) => (
  <div>{nodes.map(node => <Node node={node} key={node.name} />)}</div>
)

const NodesContainer = () => (
  <Query query={GET_NODES}>
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>
      {
        console.log(data)
      }
      return <Nodes nodes={data.nodes} />
    }}
  </Query>
)

export default NodesContainer

export { Nodes }
