import React from 'react';
import Head from 'next/head';
import Box from '../../elements/Box';
import PropTypes from 'prop-types';
import ListUsers from '../../containers/ListUsers';
import { AppWrapper } from '../../containers/app.style';

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
      <AppWrapper>
        <Box {...row}>
          <Box {...col}>
            <ListUsers />
          </Box>
        </Box>
      </AppWrapper>
    </>
  );
};

Federation.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
  list: PropTypes.object,
  tools: PropTypes.object,
};

Federation.defaultProps = {
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  col: {
    width: '100%',
  },
};

export default Federation;
