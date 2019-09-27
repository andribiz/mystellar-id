import LayoutConsole from '../containers/LayoutConsole';
import React from 'react';

const MyApp = ({ router, Component, pageProps }) => {
  const staticPage = router.pathname.startsWith('/console');

  return !staticPage ? (
    <Component {...pageProps} />
  ) : (
    <LayoutConsole>
      <Component {...pageProps} />
    </LayoutConsole>
  );
};

export default MyApp;
