import styled from 'styled-components';
import { themeGet } from 'styled-system';
// import BgImage from '../../assets/image/bg-register.png';
import BgCard from '../../assets/image/elips.png';
import BgImage from '../../assets/image/bg-register-new.png';

const StepRegisterWrapper = styled.div`
  margin-top: 50px;
  width: 100%;
  background-image: url(${BgImage});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;

  .card {
    width: 90%;
    height: 220px;
    margin-top: 250px;
    margin-left: 5%;
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
  .reusecore__button {
    background-color: transparent;
    &.default {
      background-color: rgb(26, 115, 232);
      transition: all 0.3s ease;
    }
  }

  .google-login__btn {
    width: 100%;
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 45px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    .btn-icon {
      position: relative;
      left: -22px;
      img {
        width: 21px;
        height: auto;
      }
    }
    &:hover {
      background: transparent;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
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
  .reusecore__checkbox {
    margin: 0 0 35px;
    label {
      .reusecore__field-label {
        font-size: 13px;
        font-weight: 400;
      }
    }
  }
`;

export default StepRegisterWrapper;
