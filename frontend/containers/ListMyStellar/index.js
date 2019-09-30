import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '../../elements/Box';
import Heading from '../../elements/Heading';
import ListMystellarWrapper from './ListMystellar.style';
import FirebaseHelper from '../../helper/firebase';
import { Divider, Table } from 'antd';
import 'antd/es/alert/style/css';

const { dbfed } = FirebaseHelper;
const { Column } = Table;

const ListMystellar = ({ titleStyle, contentWrapper, user }) => {
  const [data, setData] = useState([]);

  const toJson = doc => {
    const dt = doc.data();
    return {
      id: doc.id,
      email: dt.email,
      memo: dt.memo,
      stellar_addr: dt.stellar_addr,
      memo_type: dt.memo_type,
    };
  };

  const updateData = async user => {
    let dt = dbfed().where('email', '==', user.email);

    dt.onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          setData(data => [...data, toJson(change.doc)]);
        }
      });
    });
  };

  useEffect(() => {
    updateData(user);

    return () => {
      dbfed().onSnapshot(function() {});
    };
  }, [data]);

  return (
    <ListMystellarWrapper>
      <Box {...contentWrapper}>
        <Heading content="Your Addresses" {...titleStyle} />

        <Table dataSource={data} scroll={{ x: '200%' }}>
          <Column title="Federation" dataIndex="id" key="id" fixed="left" />
          <Column title="Memo Type" dataIndex="memo_type" key="memo_type" />
          <Column title="Memo" dataIndex="memo" key="memo" />
          <Column
            title="Stellar Addr"
            dataIndex="stellar_addr"
            key="stellar_addr"
          />

          <Column
            title="Action"
            key="Action"
            render={(text, record) => (
              <span>
                <a>Change</a>
                <Divider type="vertical" />
                <a>Delete</a>
              </span>
            )}
            fixed="right"
          />
        </Table>
      </Box>
    </ListMystellarWrapper>
  );
};

// Login style props
ListMystellar.propTypes = {
  titleStyle: PropTypes.object,
  contentWrapper: PropTypes.object,
  user: PropTypes.object,
};

// Login default style
ListMystellar.defaultProps = {
  // Title default style
  titleStyle: {
    fontSize: ['22px', '36px', '50px'],
    fontWeight: '400',
    color: '#20201D',
    letterSpacing: '-0.025em',
    mt: '35px',
    mb: '10px',
  },
  // Content wrapper style
  contentWrapper: {
    pl: ['17px', '32px', '38px', '40px', '56px'],
    pr: '32px',
    pb: '32px',
  },
};

export default ListMystellar;
