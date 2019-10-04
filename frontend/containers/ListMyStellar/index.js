import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '../../elements/Box';
import Heading from '../../elements/Heading';
import ListMystellarWrapper from './ListMystellar.style';
import FirebaseHelper from '../../helper/firebase';
import { Divider, notification, Popconfirm, Table } from 'antd';
import 'antd/es/alert/style/css';

const { deleteFed, onSnapshotFed } = FirebaseHelper;
const { Column } = Table;

const ListMystellar = ({ titleStyle, contentWrapper, user, loadData }) => {
  const [data, setData] = useState([]);

  const toJson = doc => {
    const dt = doc.data();
    return {
      address: doc.id,
      email: dt.email,
      memo: dt.memo,
      stellar_addr: dt.stellar_addr,
      memo_type: dt.memo_type,
    };
  };

  const openNotification = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const removeDomain = async record => {
    const result = await deleteFed(record);
    if (result.errMsg === '') {
      setData(data => data.filter(row => row.address != record));
      openNotification('success', 'Address has been deleted');
    } else {
      openNotification('error', result.errMsg);
    }
  };

  const MapData = item => {
    if (item.address.substr(0, item.address.indexOf('*')) === this.address) {
      item.stellar_addr = this.stellar_addr;
      item.memo = this.memo;
    }
    return item;
  };

  const onSnapshot = snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        setData(data => [...data, toJson(change.doc)]);
      } else if (change.type === 'modified') {
        setData(data => data.map(MapData, change.doc.data()));
      }
    });
  };

  useEffect(() => {
    const unsubscribe = onSnapshotFed(user, onSnapshot);
    return () => {
      unsubscribe();
    };
  }, []);

  const setRecord = value => {
    const val = {
      ...value,
      address: value.address.substr(0, value.address.indexOf('*')),
    };
    loadData(val);
  };

  return (
    <ListMystellarWrapper>
      <Box {...contentWrapper}>
        <Heading content="Your Addresses" {...titleStyle} />

        <Table dataSource={data} scroll={{ x: '200%' }}>
          <Column
            title="Federation"
            dataIndex="address"
            key="address"
            fixed="left"
          />
          <Column
            title="Stellar Addr"
            dataIndex="stellar_addr"
            key="stellar_addr"
          />
          <Column title="Memo Type" dataIndex="memo_type" key="memo_type" />
          <Column title="Memo" dataIndex="memo" key="memo" />

          <Column
            title="Action"
            key="Action"
            render={(text, record) => (
              <span>
                <a onClick={() => setRecord(record)}>Change</a>
                <Divider type="vertical" />
                <Popconfirm
                  title="Are you sure want to delete this address?"
                  okText={'Delete'}
                  onConfirm={() => removeDomain(record.address)}
                >
                  <a>Delete</a>
                </Popconfirm>
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
  loadData: PropTypes.func,
};

// Login default style
ListMystellar.defaultProps = {
  // Title default style
  titleStyle: {
    fontSize: ['22px', '36px', '40px'],
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
