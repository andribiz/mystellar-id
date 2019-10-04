import styled from 'styled-components';
import { themeGet } from 'styled-system';
// import WithDirection from '../../config/withDirection';

import bgImage from '../../assets/image/background-login.jpg';

const ForgotPasswordStyleWrapper = styled.div`
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  background-color: ${themeGet('colors.white', '#ffffff')};
  overflow: hidden;
  box-shadow: 0px 9px 20px -5px rgba(26, 115, 232, 0.57);
  border-radius: 5px;
  padding: 30px;
  margin-top: 200px;

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
  .reusecore__checkbox {
    margin: 0 0 35px;
    label {
      .reusecore__field-label {
        font-size: 13px;
        font-weight: 400;
      }
    }
  }

  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }

  .steps-action {
    margin-top: 24px;
  }
`;

export default ForgotPasswordStyleWrapper;
