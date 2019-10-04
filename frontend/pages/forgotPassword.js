import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../elements/Input';
import Button from '../elements/Button';
import ForgotPasswordStyleWrapper from '../containers/ForgetPassword/fogetPassword.style';
import Box from '../elements/Box';
import Heading from '../elements/Heading';
import Text from '../elements/Text';
import FirebaseHelper from '../helper/firebase';
import Sticky from 'react-stickynode';
import { DrawerProvider } from '../contexts/DrawerContext';
import Navbar from '../containers/Navbar';
import { AppWrapper, GlobalStyle } from '../containers/app.style';
import { appTheme } from '../theme';
import Head from 'next/dist/next-server/lib/head';
import { ResetCSS } from '../assets/css/style';
import { ThemeProvider } from 'styled-components';
import { Alert } from 'antd';

const { sendPasswordResetEmail } = FirebaseHelper;

const ForgetPassword = (
  contentWrapper,
  titleStyle,
  descriptionStyle,
  btnStyle
) => {
  const [msg, setMessage] = useState({ errCode: -1, message: '' });
  const [stateForgot, setStateForgot] = useState({
    isLoading: false,
    email: '',
  });

  const AlertMessage = () => {
    if (msg.errCode === 0)
      return <Alert message={msg.message} type="success" showIcon />;
    else if (msg.errCode === 1)
      return <Alert message={msg.message} type="error" showIcon />;
    return null;
  };

  const handleForgot = method => {
    sendPasswordResetEmail(stateForgot.email).then(() => {
      setMessage({
        errCode: 0,
        message: 'Please go to your email to reset your password',
      });
    });
  };

  return (
    <ThemeProvider theme={appTheme}>
      <>
        <Head>
          <title>Stellar Federation Service</title>
          <meta
            name="Description"
            content="stellar federation address for domain mystellar.id"
          />
          <meta name="theme-color" content="#ec5555" />
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700"
            rel="stylesheet"
          />
        </Head>

        <ResetCSS />
        <GlobalStyle />

        <AppWrapper>
          <Sticky top={0} innerZ={9999} activeClass="sticky-nav-active">
            <DrawerProvider>
              <Navbar />
            </DrawerProvider>
          </Sticky>
          <ForgotPasswordStyleWrapper>
            <Box {...contentWrapper}>
              <Heading content={'Forgot Password ?'} {...titleStyle} />
              <Text
                content={'Enter your email and we send you a reset link'}
                {...descriptionStyle}
              />
              <Box>
                <Input
                  size="large"
                  placeholder="Email"
                  value={stateForgot.email}
                  onChange={value =>
                    setStateForgot({ ...stateForgot, email: value })
                  }
                />
              </Box>
              <AlertMessage />
              <Box>
                <Button
                  className="default"
                  title="Send Request"
                  {...btnStyle}
                  onClick={() => {
                    handleForgot(FirebaseHelper.GOOGLE);
                  }}
                />
              </Box>
            </Box>
          </ForgotPasswordStyleWrapper>
        </AppWrapper>
      </>
    </ThemeProvider>
  );
};

ForgetPassword.propTypes = {
  titleStyle: PropTypes.object,
  contentWrapper: PropTypes.object,
  descriptionStyle: PropTypes.object,
  btnStyle: PropTypes.object,
};

ForgetPassword.defaultProps = {
  titleStyle: {
    fontSize: ['22px', '26px', '40px'],
    fontWeight: '400',
    color: '#20201D',
    letterSpacing: '-0.025em',
    mt: '10px',
    mb: '10px',
  },

  contentWrapper: {
    pl: ['17px', '32px', '38px', '40px', '56px'],
    pr: '32px',
    pb: '32px',
  },

  descriptionStyle: {
    color: 'rgba(52, 61, 72, 0.8)',
    fontSize: '15px',
    lineHeight: '26px',
    letterSpacing: '-0.025em',
    mb: '23px',
    ml: '1px',
  },

  btnStyle: {
    minWidth: '156px',
    fontSize: '14px',
    fontWeight: '500',
  },
};

export default ForgetPassword;
