import LayoutConsole from '../containers/LayoutConsole';
import React from 'react';
import useWindowSize from '../helper/useWindowSize';

const MyApp = ({ router, Component, pageProps }) => {
  const staticPage = router.pathname.startsWith('/console');
  const windowSize = process.browser && useWindowSize();

  return !staticPage ? (
    <Component windowSize={windowSize} {...pageProps} />
  ) : (
    <LayoutConsole windowSize={windowSize}>
      <Component {...pageProps} />
    </LayoutConsole>
  );
};

export default MyApp;
