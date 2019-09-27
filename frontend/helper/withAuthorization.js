import React, { useEffect, useState } from 'react';
import FirebaseHelper from './firebase';
const { isAuthenticated } = FirebaseHelper;
import { useRouter } from 'next/router';

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
        <h1>Loading</h1>
      </>
    );
  if (user != null) return <Component user={user} {...props} />;
  return null;
};

export default withAuthorization;
