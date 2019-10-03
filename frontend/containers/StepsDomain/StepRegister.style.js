import styled from 'styled-components';
import { themeGet } from 'styled-system';
// import BgImage from '../../assets/image/bg-register.png';
import BgCard from '../../assets/image/elips.png';
import BgImage from '../../assets/image/bg-register-new.png';

const StepRegisterWrapper = styled.div`
  width: 100%;
  background-color: ${themeGet('colors.white', '#ffffff')};
  position: relative;
  overflow: hidden;

  .image {
    margin-top: 30px;

    .streach {
      width: 100%;
      height: 100%;
    }
  }

  .card {
    width: 90%;
    height: 100%;
    margin-left: 5%;
  }

  .form {
    width: 100%;
    height: 100%;
    margin-left: 5%;
    margin-right: 5%;
    display: inline-block;

    @media (max-width: 300px) {
      .default {
        font-size: 5px;
        padding: 1px 2px;
        width: 2%;
      }
    }

    @media (max-width: 583px) {
      .default {
        font-size: 8px;
        padding: 4px 6px;
        width: 5%;
        display: inline-block;
      }
    }

    @media (max-width: 992px) {
      .default {
        font-size: 14px;
        padding: 8px 12px;
        width: 50%;
        display: inline-block;
      }
    }

    @media (min-width: 1200px) {
      .default {
        padding: 10px 16px;
        font-size: 18px;
        width: 50%;
        display: inline-block;
      }
    }
  }

  .col {
    position: relative;
    .patternImage {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    @media only screen and (max-width: 991px) {
      width: 100%;
      &.imageCol {
        display: none;
      }
    }
  }
  .reusecore__input {
    margin-bottom: 30px;
    &.is-material {
      &.is-focus {
        label {
          color: rgb(26, 115, 232);
          top: -12px;
        }
        .highlight {
          background-color: rgb(26, 115, 232);
        }
      }
    }
    label {
      font-weight: 400;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.6);
      top: 15px;
    }
  }
`;

export default StepRegisterWrapper;
