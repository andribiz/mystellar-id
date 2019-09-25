import React, {Component} from 'react';
import {useRouter} from "next/router";
import Head from 'next/head';
import securedPage from "../../helper/securedPage";

const User = () => (
  <>
      <h1>
          Page User
      </h1>
  </>
);

const Home = () => (
  <>
      <h1>
          Home
      </h1>
  </>
);

const routes = [
  { path: '/', exact: true, name: 'Home', component: Home },
  { path: '/users', exact: true,  name: 'Users List', component: User },
];


const Index = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Home page</title>
            </Head>
            <h1>halo</h1>
        </>
    );
};

export default securedPage(Index);