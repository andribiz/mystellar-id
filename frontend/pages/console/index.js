import React, {useEffect, useState} from 'react';
import Head from 'next/head';


export default function Index() {
  // const size = process.browser && useWindowSize();
  return (
      <>
        <Head>
          <title>Stellar Federation Service</title>
          <meta name="Description" content="stellar federation address for domain mystellar.id" />
            <meta name="theme-color" content="#ec5555" />
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700"
            rel="stylesheet"
          />
        </Head>
        <h1>data</h1>
      </>
  );
};
