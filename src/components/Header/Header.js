import React, { Component } from 'react'
import styled from 'react-emotion'
import ENSLogo from '../../assets/ensIconLogo.svg'
import ENSLogoTyped from '../../assets/ENS_TypeLogo_Nav.svg'
import Search from '../SearchName/Search'

const IconLogo = styled('img')`
  width: 34px;
  height: 38px;
`

const TypedLogo = styled('img')`
  width: 57px;
  height: 22px;
  margin-left: 10px;
`

const LogoContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 120px;
`

const Header = styled('header')`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const SearchHeader = styled(Search)`
  width: calc(100% - 120px);
`

const Logo = () => (
  <LogoContainer>
    <IconLogo src={ENSLogo} />
    <TypedLogo src={ENSLogoTyped} />
  </LogoContainer>
)

class HeaderContainer extends Component {
  render() {
    return (
      <Header>
        <Logo />
        <SearchHeader />
      </Header>
    )
  }
}

export default HeaderContainer
