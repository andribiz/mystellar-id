import styled from 'styled-components';
import { themeGet } from 'styled-system';
// import BgImage from '../../assets/image/bg-settings.png';
import BgImage from '../../assets/image/bg-setting-new.png';

const StepSettingsWrapper = styled.div`
  margin-top: 50px;
  width: 100%;
  height: 400px;
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

  .center {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;

export default StepSettingsWrapper;
