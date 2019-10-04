import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '../../elements/Box';
import Heading from '../../elements/Heading';
import ListMystellarWrapper from './ListDomain.style';
import FirebaseHelper from '../../helper/firebase';
import { Divider, notification, Popconfirm, Table } from 'antd';
import 'antd/es/alert/style/css';

const { deleteDomain, onSnapshotDomain } = FirebaseHelper;
const { Column } = Table;

const ListDomain = ({ titleStyle, contentWrapper, user }) => {
  const [data, setData] = useState([]);

  const openNotification = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const removeDomain = async (user, record) => {
    const result = await deleteDomain(user, record);
    if (result.errMsg === '') {
      setData(data => data.filter(row => row.id != record.id));
      openNotification('success', 'Data has been deleted');
    } else {
      openNotification('error', result.errMsg);
    }
  };

  const toJson = doc => {
    return {
      key: doc.id,
      id: doc.id,
      domain: doc.data().domain,
    };
  };

  const onSnapshot = snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        setData(data => [...data, toJson(change.doc)]);
      }
    });
  };

  useEffect(() => {
    const snap = onSnapshotDomain(user, onSnapshot);

    return () => {
      snap();
    };
  }, []);

  return (
    <ListMystellarWrapper>
      <Box {...contentWrapper}>
        <Heading content="Your Domains" {...titleStyle} />

        <Table dataSource={data}>
          <Column title="Domain" dataIndex="domain" key="domain" />
          <Column
            title="Action"
            key="Action"
            render={(text, record) => (
              <span>
                <Popconfirm
                  title="Are you sure want to delete this domain?"
                  okText={'Delete'}
                  onConfirm={() => removeDomain(user, record)}
                >
                  <a>Delete</a>
                </Popconfirm>
              </span>
            )}
          />
        </Table>
      </Box>
    </ListMystellarWrapper>
  );
};

// Login style props
ListDomain.propTypes = {
  titleStyle: PropTypes.object,
  contentWrapper: PropTypes.object,
  user: PropTypes.object,
};

// Login default style
ListDomain.defaultProps = {
  // Title default style
  titleStyle: {
    fontSize: ['22px', '26px', '40px'],
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

export default ListDomain;
