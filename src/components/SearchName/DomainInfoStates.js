import React, { Fragment } from 'react'
import Bid from './Bid'

export const Open = ({ domainState }) => (
  <Fragment>
    <div>{domainState.name} is available!</div>
    <Bid domainState={domainState} />
  </Fragment>
)

export const Auction = ({ domainState }) => (
  <div>
    {domainState.name} is under auction
    <Bid domainState={domainState} />
  </div>
)

export const Owned = ({ domainState }) => (
  <div>{domainState.name} is owned!</div>
)

export const Forbidden = ({ domainState }) => (
  <div>{domainState.name} is Forbidden!</div>
)

export const Reveal = ({ domainState }) => (
  <div>{domainState.name} is in the reveal stage!</div>
)

export const NotYetAvailable = ({ domainState }) => (
  <div>{domainState.name} is not yet available</div>
)
