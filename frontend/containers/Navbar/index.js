import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';
import ScrollSpyMenu from '../../components/ScrollSpyMenu';
import { Icon } from 'react-icons-kit';
import { closeModal } from '@redq/reuse-modal';
import { menu } from 'react-icons-kit/feather/menu';
import { x } from 'react-icons-kit/feather/x';
import Logo from '../../elements/UI/Logo';
import Button from '../../elements/Button';
import Container from '../../components/UI/Container';

import NavbarWrapper, { MenuArea, MobileMenu } from './navbar.style';

import navbar from '../../data/Navbar';
import Link from 'next/link';

const Navbar = ({ isSimple }) => {
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
        <Logo className="logo" href="/" logoSrc={logo} title="MyStellar ID" />
        {/* end of logo */}

        <MenuArea>
          {!isSimple && (
            <>
              <ScrollSpyMenu
                className="menu"
                menuItems={navMenu}
                offset={-84}
              />
              <Link href={'/login'}>
                <Button className="trail" title="Console" />
              </Link>
            </>
          )}

          <Button
            className="menubar"
            href="/"
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
