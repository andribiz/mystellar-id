import styled from 'styled-components';
import {themeGet} from 'styled-system';

export const FaqSectionHeader = styled.header`
  max-width: 352px;
  width: 100%;
  margin: 0 auto 58px;
  text-align: center;
  @media only screen and (max-width: 991px) {
    margin-bottom: 50px;
  }
  h5 {
    font-size: 14px;
    font-weight: 700;
    line-height: 24px;
    margin-bottom: 12px;
    letter-spacing: 1.5px;
    color: ${themeGet('colors.primary', '#2563FF')};
    text-transform: uppercase;
    @media only screen and (max-width: 991px) {
      font-size: 13px;
      margin-bottom: 10px;
    }
  }
  h2 {
    font-size: 30px;
    line-height: 36px;
    font-weight: 700;
    color: ${themeGet('colors.headingColor', '#0F2137')};
    margin: 0;
    letter-spacing: -1px;
    @media only screen and (max-width: 1366px) {
      font-size: 28px;
      letter-spacing: -0.7px;
    }
    @media only screen and (max-width: 991px) {
      font-size: 26px;
      line-height: 38px;
      letter-spacing: -0.5px;
    }
  }
`;

const FaqSection = styled.section`
  padding: 75px 0;
  overflow: hidden;
  @media only screen and (max-width: 1366px) {
    padding: 60px 0;
  }
  @media only screen and (max-width: 667px) {
    padding: 45px 0;
  }

  .reusecore__accordion {
    max-width: 750px;
    margin: 0 auto;

    .accordion__item {
      border-top: 0;
      border-bottom: 1px solid ${themeGet('colors.inactiveIcon', '#ebebeb')};
      &:last-child {
        border-bottom: 0;
      }

      .accordion__header {
        padding: 16px 0;

        > div {
          flex-direction: row-reverse;
          justify-content: flex-start;

          .icon-wrapper {
            width: 30px;
            flex-grow: 0;
            flex-shrink: 0;
            margin-left: 0;
            margin-right: 12px;
            color: ${themeGet('colors.primary', '#2563FF')};
            @media only screen and (max-width: 767px) {
              margin-right: 15px;
            }
          }
        }
      }

      .accordion__body {
        padding: 0 0 20px 41px;
      }
    }

    h3,
    p {
      margin: 0;
    }

    h3 {
      font-size: 18px;
      line-height: 40px;
      font-weight: 500;
      color: ${themeGet('colors.headingColor', '#0F2137')};
      @media only screen and (max-width: 667px) {
        font-size: 16px;
        line-height: 28px;
      }
    }

    p {
      font-size: 15px;
      line-height: 28px;
      color: ${themeGet('colors.textColor', 'rgba(52, 61, 72, 0.8)')};
    }
  }
`;

export default FaqSection;
