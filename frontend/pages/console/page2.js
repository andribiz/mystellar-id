import React, {Component} from 'react';
import Head from 'next/head';
import securedPage from "../../helper/securedPage";


const Index = () => (
    <>
        <Head>
            <title>Home page</title>
        </Head>
        <h1>Page2</h1>
    </>
);

export default securedPage(Index);
