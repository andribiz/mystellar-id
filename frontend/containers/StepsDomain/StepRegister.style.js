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
