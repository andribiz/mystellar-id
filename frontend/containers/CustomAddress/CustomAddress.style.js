import styled from 'styled-components';

const CustomAddressWrapper = styled.section`
  padding: 40px 0 60px;
  position: relative;
  overflow: hidden;
  padding: 80px 0 60px;
  .feature__block {
    s @media (max-width: 990px) {
      padding-right: 0px;
    }
    .reusecore__button {
      transition: all 0.3s ease;
      &:hover {
        opacity: 0.85;
      }
    }
  }

  .button__wrapper {
    text-align: center;
  }
  .backgroungImg {
    position: absolute;
    top: 80px;
    right: 40px;
    z-index: -1;
    pointer-events: none;
    @media (max-width: 1600px) {
      right: -220px;
      top: 80px;
    }
    @media (max-width: 1100px) {
      display: none;
    }
  }
`;
export default CustomAddressWrapper;
