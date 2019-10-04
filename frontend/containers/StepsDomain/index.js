import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '../../elements/Box';
import Heading from '../../elements/Heading';
import StepsDomainWrapper from './StepsDomain.style';
import { Steps } from 'antd';
import 'antd/es/alert/style/css';
import StepRegister from './StepRegister';
import StepSetting from './StepSettings';
import StepFinish from './StepFinish';

const { Step } = Steps;

const StepsDomain = ({ titleStyle, contentWrapper, user }) => {
  const [state, setState] = useState({ current: 0, domain: '' });

  const next = domain => {
    domain
      ? setState({ ...state, current: state.current + 1, domain: domain })
      : setState({ ...state, current: state.current + 1 });
  };

  const prev = () => {
    setState({ ...state, current: state.current - 1 });
  };

  const restart = () => {
    setState({ ...state, current: 0 });
  };

  const windowSteps = [
    <StepRegister user={user} nextStep={next} />,
    <StepSetting
      prevStep={prev}
      nextStep={next}
      domain={state.domain}
      user={user}
    />,
    <StepFinish restart={restart} />,
  ];

  return (
    <StepsDomainWrapper>
      <Box {...contentWrapper}>
        <Heading content={'New Domain'} {...titleStyle} />

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
