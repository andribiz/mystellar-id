import React from 'react';
import Sticky from 'react-stickynode';
import { DrawerProvider } from '../contexts/DrawerContext';
import Navbar from '../containers/Navbar';
import { AppWrapper, GlobalStyle } from '../containers/app.style';
import { appTheme } from '../theme';
import Head from 'next/dist/next-server/lib/head';
import { ResetCSS } from '../assets/css/style';
import { ThemeProvider } from 'styled-components';
import ForgetPassword from '../containers/ForgetPassword';

const Forget = () => {
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
            <ForgetPassword />
          </Sticky>
        </AppWrapper>
      </>
    </ThemeProvider>
  );
};

export default Forget;
