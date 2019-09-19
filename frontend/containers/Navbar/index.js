import React, {useState} from 'react';
import Fade from 'react-reveal/Fade';
import ScrollSpyMenu from '../../components/ScrollSpyMenu';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import {Icon} from 'react-icons-kit';
import {menu} from 'react-icons-kit/feather/menu';
import {x} from 'react-icons-kit/feather/x';
import Logo from '../../elements/UI/Logo';
import Button from '../../elements/Button';
import Container from '../../components/UI/Container';

import NavbarWrapper, {MenuArea, MobileMenu} from './navbar.style';

import navbar from '../../data/Navbar';

const Navbar = () => {
  const { logo, navMenu } = navbar;
  const [state, setState] = useState({
    mobileMenu: false,
  });

  const toggleHandler = type => {
    if (type === 'menu') {
      setState({
        ...state,
        mobileMenu: !state.mobileMenu,
      });
    }
  };

  return (
    <NavbarWrapper className="navbar">
      <Container>
        <Logo
          className="logo"
          href="/appclassic"
          logoSrc={logo}
          title="App Classic"
        />
        {/* end of logo */}

        <MenuArea>
          <ScrollSpyMenu className="menu" menuItems={navMenu} offset={-84} />
          {/* end of main menu */}

          <AnchorLink href="#home" offset={84}>
            <Button className="trail" title="Try for Free" />
          </AnchorLink>

          <Button
            className="menubar"
            icon={
              state.mobileMenu ? (
                <Icon className="bar" icon={x} />
              ) : (
                <Fade>
                  <Icon className="close" icon={menu} />
                </Fade>
              )
            }
            color="#0F2137"
            variant="textButton"
            onClick={() => toggleHandler('menu')}

          />
        </MenuArea>
      </Container>

      {/* start mobile menu */}
      <MobileMenu className={`mobile-menu ${state.mobileMenu ? 'active' : ''}`}>
        <Container>
          <ScrollSpyMenu className="menu" menuItems={navMenu} offset={-84} />
          <Button title="Try for Free" />
        </Container>
      </MobileMenu>
      {/* end of mobile menu */}
    </NavbarWrapper>
  );
};

export default Navbar;
