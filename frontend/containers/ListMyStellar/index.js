import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '../../elements/Box';
import Text from '../../elements/Text';
import Heading from '../../elements/Heading';
import Input from '../../elements/Input';
import Button from '../../elements/Button';
import Image from '../../elements/Image';
import ListMystellarWrapper from './ListMystellar.style';
import GoogleLogo from '../../assets/image/google-icon.jpg';
import FirebaseHelper from '../../helper/firebase';
import { Alert, Table, Divider } from 'antd';
import 'antd/es/alert/style/css';
import StellarBase from 'stellar-sdk';

const { login, insertAddress, isAuthenticated, dbfed } = FirebaseHelper;
const { Column, ColumnGroup } = Table;

const ListMystellar = ({
  btnStyle,
  titleStyle,
  contentWrapper,
  descriptionStyle,
  hintTextStyle,
  googleButtonStyle,
}) => {
  const [msg, setMessage] = useState({ errCode: -1, message: '' });
  const [user, setUser] = useState(null);
  const [input, setInput] = useState({
    isLoading: false,
    address: '',
    stellar_addr: '',
    memo: '',
  });
  const [data, setData] = useState([]);

  function toJson(doc) {
    const dt = doc.data();
    return {
      id: doc.id,
      email: dt.email,
      memo: dt.memo,
      stellar_addr: dt.stellar_addr,
      memo_type: dt.memo_type,
    };
  }

  const handleSigning = () => {
    login('google').then(result => {
      setUser(result.user);
    });
  };

  function toJson(doc) {
    const dt = doc.data();
    return {
      id: doc.id,
      email: dt.email,
      memo: dt.memo,
      stellar_addr: dt.stellar_addr,
      memo_type: dt.memo_type,
    };
  }

  const unsubscribe = dbfed().onSnapshot(function() {});

  const updateData = async user => {
    let dt = dbfed().where('email', '==', user.email);

    dt.onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          setData(data => [...data, toJson(change.doc)]);
        }
        // if (change.type === "modified") {
        //     console.log("Modified city: ", change.doc.data());
        // }
        // if (change.type === "removed") {
        //     console.log("Removed city: ", change.doc.data());
        // }
      });
    });
  };

  useEffect(() => {
    isAuthenticated(user => {
      setUser(user);
      if (user) {
        updateData(user);

        return () => {
          unsubscribe();
        };
      }
    });
  }, []);

  const handleSubmit = () => {
    if (!user) {
      // console.log(a);
      return setMessage({ errCode: 1, message: 'Please sign in first' });
    }
    if (!/^[a-zA-Z0-9\s]{5,}$/.test(input.address)) {
      return setMessage({
        errCode: 1,
        message: 'Address must be alphanumeric and minimum length 5',
      });
    }
    if (!StellarBase.StrKey.isValidEd25519PublicKey(input.stellar_addr)) {
      return setMessage({ errCode: 1, message: 'Not Valid stellar address' });
    }

    setInput({ ...input, isLoading: true });
    insertAddress(
      user.email,
      input.address,
      input.stellar_addr,
      input.memo
    ).then(res => {
      res.errMsg === ''
        ? setMessage({ errCode: 0, message: 'Federation successfully listed' })
        : setMessage({ errCode: 1, message: res.errMsg });
      setInput({ ...input, isLoading: false });
    });
  };

  const LoginButtonGroup = ({ isLoggedIn }) => (
    <Fragment>
      {!isLoggedIn && (
        <Text
          content="Please sign in in case you need to edit your federation address"
          {...descriptionStyle}
        />
      )}
      {!isLoggedIn && (
        <Button
          icon={<Image src={GoogleLogo} alt="Google Icon" />}
          title="Sign in with Google"
          iconPosition="left"
          className="google-login__btn"
          onClick={handleSigning}
          {...googleButtonStyle}
        />
      )}
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
        <AlertMessage />
        <div>
          <LoginButtonGroup isLoggedIn={!!user} />
        </div>
      </Box>
    </ListMystellarWrapper>
  );
};

// Login style props
ListMystellar.propTypes = {
  btnStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  hintTextStyle: PropTypes.object,
  contentWrapper: PropTypes.object,
  descriptionStyle: PropTypes.object,
  googleButtonStyle: PropTypes.object,
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

export default ListMystellar;
