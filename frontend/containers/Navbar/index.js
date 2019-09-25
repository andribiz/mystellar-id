import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';
import ScrollSpyMenu from '../../components/ScrollSpyMenu';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { Icon } from 'react-icons-kit';
import { openModal, closeModal } from '@redq/reuse-modal';
import { menu } from 'react-icons-kit/feather/menu';
import { x } from 'react-icons-kit/feather/x';
import Logo from '../../elements/UI/Logo';
import Button from '../../elements/Button';
import Container from '../../components/UI/Container';
import LoginModal from '../LoginModal';
import Scrollspy from 'react-scrollspy';

import NavbarWrapper, { MenuArea, MobileMenu } from './navbar.style';

import navbar from '../../data/Navbar';

const CloseModalButton = () => (
  <Button
    className="modalCloseBtn"
    variant="fab"
    onClick={() => closeModal()}
    icon={<i className="flaticon-plus-symbol" />}
  />
);

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

  // Authentication modal handler
  const handleLoginModal = () => {
    // openModal({
    //   config: {
    //     className: 'login-modal',
    //     disableDragging: true,
    //     width: '100%',
    //     height: '100%',
    //     animationFrom: { transform: 'translateY(100px)' }, // react-spring <Spring from={}> props value
    //     animationTo: { transform: 'translateY(0)' }, //  react-spring <Spring to={}> props value
    //     transition: {
    //       mass: 1,
    //       tension: 180,
    //       friction: 26,
    //     },
    //   },
    //   component: LoginModal,
    //   componentProps: {},
    //   closeComponent: CloseModalButton,
    //   closeOnClickOutside: false,
    // });

    window.location.href = '/login';
  };

  return (
    <NavbarWrapper className="navbar">
      <Container>
        <Logo className="logo" href="/" logoSrc={logo} title="MyStellar ID" />
        {/* end of logo */}

        <MenuArea>
          {/*<ScrollSpyMenu className="menu" menuItems={navMenu} offset={-84} />*/}

          {/*<nav>*/}
          <Scrollspy className="menu" items={['1', '2', '3']} offset={-84}>
            <li>
              <a href="/#tools">Tools</a>
            </li>
            <li>
              <a href="/#faq">FAQ</a>
            </li>
            <li>
              <a href="/#home">
                <Button className="trail" title="Try for Free" />
              </a>
            </li>
          </Scrollspy>
          {/*</nav>*/}

          {/* end of main menu */}

          <Button
            className="login"
            variant="textButton"
            onClick={handleLoginModal}
            icon={<i className="flaticon-user" />}
            aria-label="login"
          />

          {/*<AnchorLink href="#home" offset={84}>*/}
          {/*  <Button className="trail" title="Try for Free" />*/}
          {/*</AnchorLink>*/}

          {/*<Button className="trail" title="Try for Free" href="http://localhost:3000/#home"/>*/}

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
