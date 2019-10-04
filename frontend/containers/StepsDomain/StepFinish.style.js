import styled from 'styled-components';
import { themeGet } from 'styled-system';

const StepFinishWrapper = styled.div`
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
    height: 130px;
    margin-left: 5%;
  }

  .button {
    margin-left: 5%;
  }

  .center {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;

export default StepFinishWrapper;
