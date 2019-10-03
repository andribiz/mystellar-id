import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '../../elements/Box';
import Heading from '../../elements/Heading';
import Button from '../../elements/Button';
import StepsDomainWrapper from './formAddress.style';
import { Steps } from 'antd';
import 'antd/es/alert/style/css';
import StepRegister from './StepRegister';
import StepSetting from './StepSettings';
import StepFinish from './StepFinish';

const { Step } = Steps;

const StepsDomain = ({ titleStyle, contentWrapper, user }) => {
  const [state, setState] = useState({ current: 0 });

  const next = () => {
    console.log(state.current);
    setState({ current: state.current + 1 });
  };
  const prev = () => {
    setState({ current: state.current - 1 });
  };

  const windowSteps = [
    <StepRegister user={user} nextStep={next} />,
    <StepSetting nextStep={next} />,
    <StepFinish />,
  ];

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
      </Box>
    </StepsDomainWrapper>
  );
};

// Login style props
StepsDomain.propTypes = {
  btnStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  contentWrapper: PropTypes.object,
  user: PropTypes.object,
};

// Login default style
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

  // Content wrapper style
  contentWrapper: {
    pl: ['17px', '32px', '38px', '40px', '56px'],
    pr: '32px',
    pb: '32px',
  },
  // Default button style
};

export default StepsDomain;
