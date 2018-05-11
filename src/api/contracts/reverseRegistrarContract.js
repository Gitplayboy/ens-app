export default [
  {
    constant: false,
    inputs: [
      {
        name: 'owner',
        type: 'address'
      },
      {
        name: 'resolver',
        type: 'address'
      }
    ],
    name: 'claimWithResolver',
    outputs: [
      {
        name: 'node',
        type: 'bytes32'
      }
    ],
    payable: false,
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'owner',
        type: 'address'
      }
    ],
    name: 'claim',
    outputs: [
      {
        name: 'node',
        type: 'bytes32'
      }
    ],
    payable: false,
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'ens',
    outputs: [
      {
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'defaultResolver',
    outputs: [
      {
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'addr',
        type: 'address'
      }
    ],
    name: 'node',
    outputs: [
      {
        name: 'ret',
        type: 'bytes32'
      }
    ],
    payable: false,
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'name',
        type: 'string'
      }
    ],
    name: 'setName',
    outputs: [
      {
        name: 'node',
        type: 'bytes32'
      }
    ],
    payable: false,
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'ensAddr',
        type: 'address'
      },
      {
        name: 'resolverAddr',
        type: 'address'
      }
    ],
    payable: false,
    type: 'constructor'
  }
]
