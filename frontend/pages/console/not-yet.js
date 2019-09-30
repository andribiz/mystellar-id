import React from 'react';
import Head from 'next/head';
import Container from '../../components/UI/Container';
import Box from '../../elements/Box';
import PropTypes from 'prop-types';
import ListUsers from '../../containers/ListUsers';

const Federation = ({ row, col, list }) => {
  // const size = process.browser && useWindowSize();
  return (
    <>
      <Head>
        <title>Stellar Federation Service</title>
        <meta
          name="Description"
          content="stellar federation address for domain mystellar.id"
        />
        <meta name="theme-color" content="#ec5555" />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700"
          rel="stylesheet"
        />
      </Head>
      <Container>
        <Box {...row}>
          <Box {...col}>
            <h1>Please be patient, this feature is to be developed</h1>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Federation;
