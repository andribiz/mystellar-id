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
import Footer from '../containers/Footer';
import { AppWrapper, GlobalStyle } from '../containers/app.style';
import { appTheme } from '../theme';
import Head from 'next/dist/next-server/lib/head';
import { ResetCSS } from '../assets/css/style';
import { ThemeProvider } from 'styled-components';
import { useRouter } from 'next/router';

const { confirmPasswordReset } = FirebaseHelper;

const ResetPassword = (
  contentWrapper,
  titleStyle,
  descriptionStyle,
  btnStyle
) => {
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
              <Heading content={'Reset Your Password'} {...titleStyle} />
              <Text
                content={'Enter your new password and confirm the password'}
                {...descriptionStyle}
              />
              <Box>
                <Input size="large" placeholder="new password" />
              </Box>
              <Box>
                <Input size="large" placeholder="confirm password" />
              </Box>
              <Box>
                <Button
                  className="default"
                  title="Reset Password"
                  {...btnStyle}
                />
              </Box>
            </Box>
          </ForgotPasswordStyleWrapper>

          {/*<Footer/>*/}
        </AppWrapper>
      </>
    </ThemeProvider>
  );
};

ResetPassword.propTypes = {
  titleStyle: PropTypes.object,
  contentWrapper: PropTypes.object,
  descriptionStyle: PropTypes.object,
  btnStyle: PropTypes.object,
};

ResetPassword.defaultProps = {
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

export default ResetPassword;
