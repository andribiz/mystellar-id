import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '../../elements/Box';
import Heading from '../../elements/Heading';
import Button from '../../elements/Button';
import ListMystellarWrapper from './ListDomain.style';
import FirebaseHelper from '../../helper/firebase';
import { Alert, Divider, Table } from 'antd';
import 'antd/es/alert/style/css';

const { login, insertAddress, isAuthenticated, dbUser } = FirebaseHelper;
const { Column, ColumnGroup } = Table;

const ListDomain = ({
  btnStyle,
  titleStyle,
  contentWrapper,
  descriptionStyle,
  hintTextStyle,
  googleButtonStyle,
}) => {
  const [msg, setMessage] = useState({ errCode: -1, message: '' });
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [input, setInput] = useState({
    isLoading: false,
    address: '',
    stellar_addr: '',
    memo: '',
  });

  const handleSigning = () => {
    login('google').then(result => {
      setUser(result.user);
    });
  };

  const remove = record => {
    dbUser()
      .doc(user.uid)
      .collection('domains')
      .doc(record.id)
      .delete()
      .then(res => {
        setData(data => data.filter(row => row.id != record.id));
      })
      .catch(e => {
        console.log(e);
      });
  };

  function toJson(doc) {
    return {
      id: doc.id,
      domain: doc.data().domain,
    };
  }
  const getData = async () => {
    if (user) {
      let dt = [];
      await dbUser()
        .doc(user.uid)
        .collection('domains')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            setData(data => [...data, toJson(doc)]);
          });
        })
        .catch(function(error) {
          console.log('Error getting documents: ', error);
        });
    }
  };

  useEffect(() => {
    isAuthenticated(
      user => {
        setUser(user);
        getData();
      },
      [user, data]
    );
  }, [user]);

  const handleSubmit = () => {};

  const LoginButtonGroup = ({ isLoggedIn }) => (
    <Fragment>
      <Button
        className="default"
        title="I'm Ready"
        onClick={handleSubmit}
        isLoading={input.isLoading}
        disabled={input.isLoading}
        {...btnStyle}
      />
    </Fragment>
  );

  const AlertMessage = () => {
    if (msg.errCode === 0)
      return <Alert message={msg.message} type="success" showIcon />;
    else if (msg.errCode === 1)
      return <Alert message={msg.message} type="error" showIcon />;
    return null;
  };

  return (
    <ListMystellarWrapper>
      <Box {...contentWrapper}>
        <Heading content="Your Addresses" {...titleStyle} />

        <Table dataSource={data}>
          <Column title="Domain" dataIndex="domain" key="domain" />
          <Column
            title="Action"
            key="Action"
            render={(text, record) => (
              <span>
                <a onClick={() => remove(record)}>Delete</a>
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
  btnStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  hintTextStyle: PropTypes.object,
  contentWrapper: PropTypes.object,
  descriptionStyle: PropTypes.object,
  googleButtonStyle: PropTypes.object,
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
  // Description default style
  descriptionStyle: {
    color: 'rgba(52, 61, 72, 0.8)',
    fontSize: '15px',
    lineHeight: '26px',
    letterSpacing: '-0.025em',
    mb: '23px',
    ml: '1px',
  },
  hintTextStyle: {
    color: 'rgba(52, 61, 72, 0.8)',
    fontSize: '12px',
    lineHeight: '20px',
    letterSpacing: '-0.025em',
    mb: '10px',
    mt: '-20px',
    ml: '1px',
  },
  // Content wrapper style
  contentWrapper: {
    pl: ['17px', '32px', '38px', '40px', '56px'],
    pr: '32px',
    pb: '32px',
  },
  // Default button style
  btnStyle: {
    minWidth: '156px',
    fontSize: '14px',
    fontWeight: '500',
  },
  // Google button style
  googleButtonStyle: {
    bg: '#ffffff',
    color: '#343D48',
  },
};

export default ListDomain;
