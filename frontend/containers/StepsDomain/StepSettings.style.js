import styled from 'styled-components';
import { themeGet } from 'styled-system';
// import BgImage from '../../assets/image/bg-settings.png';
import BgImage from '../../assets/image/bg-setting-new.png';

const StepSettingsWrapper = styled.div`
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

    .text {
      text-align: justify;
    }
  }

  .form {
    width: 100%;
    margin-left: 5%;
    margin-right: 5%;
    display: inline-block;
  }

  .button {
    margin-top: 20px;
    margin-left: 5%;
  }

  .center {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;

export default StepSettingsWrapper;
