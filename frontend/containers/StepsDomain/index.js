import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '../../elements/Box';
import Text from '../../elements/Text';
import Heading from '../../elements/Heading';
import Input from '../../elements/Input';
import Button from '../../elements/Button';
import Image from '../../elements/Image';
import StepsDomainWrapper from './formAddress.style';
import GoogleLogo from '../../assets/image/google-icon.jpg';
import FirebaseHelper from '../../helper/firebase';
import { Alert, Steps } from 'antd';
import 'antd/es/alert/style/css';
import StellarBase from 'stellar-sdk';

const { login, insertAddress, isAuthenticated } = FirebaseHelper;
const { Step } = Steps;

const StepsDomain = ({
  btnStyle,
  titleStyle,
  contentWrapper,
  descriptionStyle,
  hintTextStyle,
}) => {
  const [msg, setMessage] = useState({ errCode: -1, message: '' });
  const [user, setUser] = useState(null);
  const [input, setInput] = useState({
    isLoading: false,
    address: '',
    stellar_addr: '',
    memo: '',
  });

  useEffect(() => {});

  const handleSubmit = () => {};

  const LoginButtonGroup = ({ isLoggedIn }) => (
    <Fragment>
      <Button
        className="default"
        title="Next"
        onClick={handleSubmit}
        isLoading={input.isLoading}
        disabled={input.isLoading}
        {...btnStyle}
      />
    </Fragment>
  );

  return (
    <StepsDomainWrapper>
      <Box {...contentWrapper}>
        <Heading content="Make your own domain" {...titleStyle} />

        <Steps type="navigation" current={0}>
          <Step key={'1'} title={'Register'} />
          <Step key={'2'} title={'Settings'} />
          <Step key={'3'} title={'Finish'} />
        </Steps>
        <Box>
          <h1>Halo 1</h1>
        </Box>
        <div>
          <LoginButtonGroup isLoggedIn={!!user} />
        </div>
      </Box>
    </StepsDomainWrapper>
  );
};

// Login style props
StepsDomain.propTypes = {
  btnStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  hintTextStyle: PropTypes.object,
  contentWrapper: PropTypes.object,
  descriptionStyle: PropTypes.object,
  googleButtonStyle: PropTypes.object,
};

// Login default style
StepsDomain.defaultProps = {
  // Title default style
  titleStyle: {
    fontSize: ['22px', '26px', '40px'],
    fontWeight: '400',
    color: '#20201D',
    letterSpacing: '-0.025em',
    mt: '35px',
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
