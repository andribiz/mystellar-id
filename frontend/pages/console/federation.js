import React from 'react';
import Head from 'next/head';
import Container from '../../components/UI/Container';
import Box from '../../elements/Box';
import PropTypes from 'prop-types';
import StepsDomain from '../../containers/StepsDomain';
import ListDomain from '../../containers/ListDomain';

const Federation = ({ row, col, list, user }) => {
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
            <StepsDomain />
          </Box>
          <Box {...list}>
            <ListDomain user={user} />
          </Box>
        </Box>
      </Container>
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
    width: ['100%', '100%', '100%', '60%', '60%'],
  },
  list: {
    width: ['100%', '100%', '100%', '40%', '40%'],
    alignSelf: 'flex-top',
  },
};

export default Federation;
