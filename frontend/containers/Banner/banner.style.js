import styled from 'styled-components';

export const ButtonWrapper = styled.div`
  position: relative;
  @media screen and (max-width: 991px) and (min-width: 767px) {
    display: flex;
    .reusecore__button {
      padding-left: 0;
      padding-right: 0;
      &.withoutBg {
        margin-left: 25px;
        &:hover {
          background: transparent !important;
          box-shadow: none !important;
        }
      }
    }
  }
  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
    .reusecore__button {
      width: 100%;
      &.withoutBg {
        border: 0;
      }
    }
  }
`;
