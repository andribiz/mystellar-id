import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import Sticky from 'react-stickynode';
import { appTheme } from '../theme';
import { AppWrapper, GlobalStyle } from '../containers/app.style';
import { ResetCSS } from '../assets/css/style';
import Navbar from '../containers/Navbar';
import { DrawerProvider } from '../contexts/DrawerContext';
import Footer from '../containers/Footer';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import withAuthentication from '../helper/withAuthentication';

const LoginForm = dynamic(() => import('../containers/Login'));

function getSize() {
  return {
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
    outerHeight: window.outerHeight,
    outerWidth: window.outerWidth,
  };
}

function useWindowSize() {
  let [windowSize, setWindowSize] = useState(getSize());

  function handleResize() {
    setWindowSize(getSize());
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
}

const LoginPage = ({ user }) => {
  const size = process.browser && useWindowSize();
  const router = useRouter();

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
              <Navbar user={user} isSimple={true} />
            </DrawerProvider>
          </Sticky>
          {/*<DomainSection/>*/}
          {/*<InfoSection />*/}
          {/*<APISection />*/}
          {/*<Faq/>*/}
          {/*<Footer />*/}
          <LoginForm />

          <Footer />
        </AppWrapper>
      </>
    </ThemeProvider>
  );
};

export default withAuthentication('/console')(LoginPage);
