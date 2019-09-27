import LayoutConsole from '../containers/LayoutConsole';
import React, { useState } from 'react';
import FirebaseHelper from '../helper/firebase';
import Router from 'next/router';

const { isAuthenticated } = FirebaseHelper;

const MyApp = ({ router, Component, pageProps }) => {
  const [user, setUser] = useState('');

  const staticPage = router.pathname.startsWith('/console');
  console.log(`${router.pathname} ${staticPage}`);

  if (user === '') {
    isAuthenticated(user => {
      setUser(user);
    });
  }

  return !staticPage ? (
    <Component user={user} {...pageProps} />
  ) : (
    <LayoutConsole user={user}>
      <Component user={user} {...pageProps} />
    </LayoutConsole>
  );
};

// MyApp.getInitialProps = async (context) => {
//     const {query, req, router, ctx} = context;
//
//     const user = await useGetUser();
//
//     const redirectTo = (url) => {
//         if (ctx.res) {
//             ctx.res.writeHead(302, {Location: url})
//             ctx.res.end()
//         } else {
//             if (url[0] === '/' && url[1] !== '/') {
//                 Router.push(url)
//             } else {
//                 window.location = url
//             }
//         }
//     }
//
//     if (["/login", "forgot"].includes(router.pathname) && user !== null) {
//         redirectTo("/console");
//     } else if (["/console"].includes(router.pathname) && user === null)
//         redirectTo("/login");
//
//
//     return {query, user};
// };

export default MyApp;
