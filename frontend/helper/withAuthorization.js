import React, { useEffect, useState } from 'react';
import FirebaseHelper from './firebase';
const { isAuthenticated } = FirebaseHelper;
import { useRouter } from 'next/router';
import Launcher from '../containers/Launcher';

const withAuthorization = Component => props => {
  const [user, setUser] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (user === '') {
      isAuthenticated(user => {
        setUser(user);
        if (!user) router.push('/login');
      });
    }
  });

  if (user === '')
    return (
      <>
        <Launcher />
      </>
    );
  if (user != null) return <Component user={user} {...props} />;
  return null;
};

export default withAuthorization;
