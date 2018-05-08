import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { NodesRecursive } from '../../fragments'

const getNodes = gql`
  query nodes {
    nodes {
      ...NodesRecursive
    }
  }

  ${NodesRecursive}
`

const Node = ({ node: { owner, name, nodes = [] } }) => (
  <div>
    {name} - {owner}
    <ul>{nodes.map(node => <Node node={node} />)}</ul>
  </div>
)

const Nodes = ({ nodes }) => (
  <div>{nodes.map(node => <Node node={node} key={node.name} />)}</div>
)

const NodesContainer = () => (
  <Query query={getNodes}>
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
