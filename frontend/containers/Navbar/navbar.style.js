import styled from 'styled-components';
import { themeGet } from 'styled-system';

const NavbarWrapper = styled.nav`
  width: 100%;
  padding: 15px 0 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  background-color: ${themeGet('colors.light', '#FAFBFF')};
  z-index: 9999;
  transition: all 0.3s ease;
  @media only screen and (max-width: 1366px) {
    padding: 10px 0 11px;
  }
  > div.container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      img {
        width: 128px;
        height: auto;
      }
    }
  }
  ul {
    li {
      a {
        color: ${themeGet('colors.menu', '#0D233E')};
        font-size: 16px;
        font-weight: 400;
      }
      &.is-current {
        a {
          color: ${themeGet('colors.primary', '#2563FF')};
        }
      }
    }
  }
`;

export const MenuArea = styled.div`
  display: flex;
  align-items: center;
  .menu {
    display: flex;
    align-items: center;
    margin-right: 11px;
    opacity: 1;
    visibility: visible;
    transition: all 0.3s ease;
    @media only screen and (max-width: 1366px) {
      margin-right: 13px;
    }
    @media only screen and (max-width: 991px) {
      display: none;
    }
    li {
      margin: 0 19px;
      @media only screen and (max-width: 1366px) {
        margin: 0 17px;
      }
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .reusecore__button {
    border-radius: 5px;
    font-weight: 500;
    text-transform: inherit;
    padding-left: 13px;
    padding-right: 13px;
    min-height: 42px;
    &.text {
      padding: 0;
      margin-right: 28px;
      .btn-icon {
        svg {
          width: 22px;
          height: auto;
          stroke: ${themeGet('colors.menu', '0D233E')};
          @media only screen and (max-width: 991px) {
            width: 24px;
          }
        }
      }
      @media only screen and (max-width: 1366px) {
        margin-right: 20px;
      }
      @media only screen and (max-width: 991px) {
        margin-right: 0;
      }
    }
    &.trail {
      @media only screen and (max-width: 991px) {
        display: none;
      }
    }
    &.menubar {
      display: none;
      @media only screen and (max-width: 991px) {
        display: inline-flex;
        padding: 0;
        justify-content: flex-end;
        min-width: 35px;
        svg {
          width: 27px;
          height: auto;
        }
        &:hover {
          background: transparent;
          box-shadow: none;
        }
      }
    }
    &.login {
      &:hover {
        background: transparent;
        box-shadow: none;
      }
    }
  }
`;

export const MobileMenu = styled.div`
  display: none;
  @media only screen and (max-width: 991px) {
    display: flex;
    width: 100%;
    height: calc(100vh - 70px);
    padding: 27px 0 40px;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: 82px;
    flex-direction: column;
    background-color: ${themeGet('colors.white', '#ffffff')};
    transition: all 0.3s ease;
    &.active {
      opacity: 1;
      visibility: visible;
      box-shadow: 0 3px 12px
        ${themeGet('colors.shadow', 'rgba(38, 78, 118, 0.1)')};
    }
    .container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    ul {
      padding-bottom: 20px;
      li {
        a {
          display: block;
          padding: 13px 0;
          border-radius: 5px;
          transition: all 0.3s ease;
        }
        &:hover {
          a {
            padding: 13px 15px;
            color: ${themeGet('colors.white', '#ffffff')};
            background-color: ${themeGet('colors.primary')};
          }
        }
      }
    }
    .reusecore__button {
      width: 100%;
      border-radius: 5px;
      @media only screen and (max-width: 480px) {
        margin-top: 20px;
      }
    }
  }
`;

export default NavbarWrapper;
