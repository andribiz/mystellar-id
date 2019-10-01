import React, { useState } from 'react';
import Head from 'next/head';

import FormAddress from '../../containers/FormAddress';
import Box from '../../elements/Box';
import PropTypes from 'prop-types';
import Container from '../../components/UI/Container';
import APISection from '../../containers/APISection';
import ListMystellar from '../../containers/ListMyStellar';

const Index = ({ row, col, list, user }) => {
  const [record, setRecord] = useState({
    memo: '',
    address: '',
    stellar_addr: '',
  });

  const loadData = val => {
    setRecord({ ...val });
  };
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
      <Container noGutter={true}>
        <Box {...row}>
          <Box {...col}>
            <FormAddress
              title={'New Address'}
              description={''}
              btnCaption={'Add'}
              user={user}
              record={record}
            />
          </Box>
          <Box {...list}>
            <ListMystellar user={user} loadData={loadData} />
          </Box>
        </Box>
        <Box {...row}>
          <Box width={'100%'}>
            <APISection />
          </Box>
        </Box>
      </Container>
    </>
  );
};

Index.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
  list: PropTypes.object,
  tools: PropTypes.object,
};

Index.defaultProps = {
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  col: {
    width: ['100%', '100%', '100%', '40%', '40%'],
  },
  list: {
    width: ['100%', '100%', '100%', '60%', '60%'],
    alignSelf: 'flex-top',
  },
};

export default Index;
