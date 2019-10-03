import styled from 'styled-components';
import { themeGet } from 'styled-system';
import BgImage from '../../assets/image/bg-register.png';
import BgCard from '../../assets/image/elips.png';

const StepRegisterWrapper = styled.div`
  width: 100%;
  height: 550px;
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
    box-shadow: 1px 4px 3px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
  }
`;

export default StepRegisterWrapper;
