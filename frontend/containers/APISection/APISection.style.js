import styled from 'styled-components';
import BgImage from '../../assets/image/map.png';

const APISectionWrapper = styled.section`
  background-color: #cfe1fa;
  background-image: url(${BgImage});
  background-repeat: no-repeat;
  background-position: 25% center;
  padding: 80px 0 100px;
  @media (max-width: 1440px) {
    padding: 40px 0 50px;
  }
  @media (max-width: 768px) {
    padding: 40px 0 0px;
  }
  @media (max-width: 500px) {
    padding: 30px 0;
  }

  .feature__block {
    position: relative;
    height: 100%;
    transition: box-shadow 0.3s ease;
    .icon__wrapper {
      position: relative;
      background: transperent;
      .flaticon-flask {
        &:before {
          margin-left: 8px;
        }
      }

      &:before {
        transform: rotate(45deg);
        background-color: rgba(255, 255, 255, 0.15);
      }
      &:after {
        transform: rotate(-45deg);
        background-color: rgba(0, 0, 0, 0.05);
      }
    }
    &:hover {
      box-shadow: 0 40px 90px -30px rgba(39, 79, 117, 0.2);
      cursor: pointer;
    }
  }

  .row {
    > .col {
      &:nth-child(1) {
        .feature__block {
          .icon__wrapper {
            color: #29cf8a;
            transition: all 0.6s ease;
          }
        }
        &:hover {
          .feature__block {
            .icon__wrapper {
              background: #29cf8a;
              color: #fff;
              border: 0;
            }
          }
        }
      }
      &:nth-child(2) {
        .feature__block {
          .icon__wrapper {
            color: #ff86ab;
            transition: all 0.6s ease;
          }
        }
        &:hover {
          .feature__block {
            .icon__wrapper {
              background: #ff86ab;
              color: #fff;
              border: 0;
            }
          }
        }
      }
      &:nth-child(3) {
        .feature__block {
          .icon__wrapper {
            color: #ff9000;
            transition: all 0.6s ease;
          }
        }
      }
      &:hover {
        .feature__block {
          .icon__wrapper {
            background: #ff9000;
            color: #fff;
          }
        }
      }
    }
  }
`;

export const ToolWrapperForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 488px;
  margin: 0 auto;
  padding-bottom: 10px;
  @media (max-width: 575px) {
    flex-direction: column;
    max-width: 100%;
  }

  .reusecore__input {
    flex: 1;
    margin-right: 20px;
    @media (max-width: 575px) {
      margin: 0 0 20px 0;
      width: 100%;
    }
    .field-wrapper {
      input {
        min-height: 45px;
      }
    }
    &.is-material {
      label {
        font-size: 14px;
        top: 14px;
        font-weight: 500;
        color: rgba(51, 61, 72, 0.4);
      }
      &.is-focus {
        label {
          top: -12px;
        }
      }
    }
  }

  .reusecore__button {
    flex-shrink: 0;
    transition: all 0.3s ease;
    @media (max-width: 575px) {
      width: 100%;
    }
  }
`;

export default APISectionWrapper;
