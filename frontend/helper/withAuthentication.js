import React, { useEffect, useState } from 'react';
import FirebaseHelper from './firebase';
const { isAuthenticated } = FirebaseHelper;
import { useRouter } from 'next/router';
import Launcher from '../assets/image/loader5.gif';

const withAuthentication = redirectUrl => Component => props => {
  const [user, setUser] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (user === '') {
      isAuthenticated(user => {
        console.log(user);
        setUser(user);
        if (user && redirectUrl) router.push(redirectUrl);
      });
    }
  });
  if (user === '')
    return (
      <>
        {/*<h1>Loading</h1>*/}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <img src={Launcher} />
          {/*<h4>Please Wait ...</h4>*/}
        </div>
      </>
    );
  else if ((user && !redirectUrl) || !user)
    return <Component user={user} {...props} />;
  return null;
};

export default withAuthentication;
