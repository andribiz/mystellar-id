import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '../../elements/Box';
import Heading from '../../elements/Heading';
import StepsDomainWrapper from './formAddress.style';
import 'antd/es/alert/style/css';
import StepRegister from './StepRegister';
import StepSetting from './StepSettings';
import { Alert, Button, Steps } from 'antd';
import StepFinish from './StepFinish';

const { Step } = Steps;

const StepsDomain = ({
  btnStyle,
  titleStyle,
  contentWrapper,
  descriptionStyle,
  hintTextStyle,
}) => {
  const [state, setState] = useState({ current: 0 });

  const next = () => {
    setState({ current: state.current + 1 });
  };
  const prev = () => {
    setState({ current: state.current - 1 });
  };

  const windowSteps = [<StepRegister />, <StepSetting />, <StepFinish />];
  return (
    <StepsDomainWrapper>
      <Box {...contentWrapper}>
        <Heading content={'Use Domain'} {...titleStyle} />

        <Steps type="navigation" current={state.current}>
          <Step key={'1'} title={'Register'} />
          <Step key={'2'} title={'Settings'} />
          <Step key={'3'} title={'Finish'} />
        </Steps>
        <Box>{windowSteps[state.current]}</Box>
        <Box>
          {state.current < 2 && (
            <Button type="primary" onClick={next} ghost>
              Next
            </Button>
          )}

          {state.current === 2 && (
            <Button type="primary" ghost>
              Input User
            </Button>
          )}
        </Box>
      </Box>
    </StepsDomainWrapper>
  );
};
//
StepsDomain.propTypes = {
  btnStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  hintTextStyle: PropTypes.object,
  contentWrapper: PropTypes.object,
  descriptionStyle: PropTypes.object,
  googleButtonStyle: PropTypes.object,
};
//
// // Login default style
StepsDomain.defaultProps = {
  // Title default style
  titleStyle: {
    fontSize: ['22px', '26px', '40px'],
    fontWeight: '400',
    color: '#20201D',
    letterSpacing: '-0.025em',
    mt: '10px',
    mb: '10px',
  },
  // Description default style
  descriptionStyle: {
    color: 'rgba(52, 61, 72, 0.8)',
    fontSize: '15px',
    lineHeight: '26px',
    letterSpacing: '-0.025em',
    mb: '23px',
    ml: '1px',
  },
  hintTextStyle: {
    color: 'rgba(52, 61, 72, 0.8)',
    fontSize: '12px',
    lineHeight: '20px',
    letterSpacing: '-0.025em',
    mb: '10px',
    mt: '-20px',
    ml: '1px',
  },
  // Content wrapper style
  contentWrapper: {
    pl: ['17px', '32px', '38px', '40px', '56px'],
    pr: '32px',
    pb: '32px',
  },
  // Default button style
  btnStyle: {
    minWidth: '156px',
    fontSize: '14px',
    fontWeight: '500',
  },
  // Google button style
  googleButtonStyle: {
    bg: '#ffffff',
    color: '#343D48',
  },
};

export default StepsDomain;
