import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import Sticky from 'react-stickynode';
import { appTheme } from '../theme';
import { AppWrapper, GlobalStyle } from '../containers/app.style';
import { ResetCSS } from '../assets/css/style';
import Navbar from '../containers/Navbar';
import DomainSection from '../containers/Banner';
import APISection from '../containers/APISection';
import InfoSection from '../containers/InfoSection';
import Footer from '../containers/Footer';
import { DrawerProvider } from '../contexts/DrawerContext';
import Faq from '../containers/Faq';
import CustomAddress from '../containers/CustomAddress';

export default function Index() {
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
          <DomainSection />
          <InfoSection />
          <APISection />
          <CustomAddress />
          <Faq />
          <Footer />
        </AppWrapper>
      </>
    </ThemeProvider>
  );
}
