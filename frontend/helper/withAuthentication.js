import React, { useEffect, useState } from 'react';
import FirebaseHelper from './firebase';
const { isAuthenticated } = FirebaseHelper;
import { useRouter } from 'next/router';
import Launcher from '../containers/Launcher';

const withAuthentication = redirectUrl => Component => props => {
  const [user, setUser] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (user === '') {
      isAuthenticated(user => {
        setUser(user);
        if (user && redirectUrl) router.push(redirectUrl);
      });
    }
  });
  if (user === '')
    return (
      <>
        {/*<h1>Loading</h1>*/}
        <Launcher />
      </>
    );
  else if ((user && !redirectUrl) || !user)
    return <Component user={user} {...props} />;
  return null;
};

export default withAuthentication;
