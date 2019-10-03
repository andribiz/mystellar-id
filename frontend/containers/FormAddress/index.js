import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '../../elements/Box';
import Text from '../../elements/Text';
import Heading from '../../elements/Heading';
import Input from '../../elements/Input';
import Button from '../../elements/Button';
import Image from '../../elements/Image';
import FormAddressWrapper from './formAddress.style';
import GoogleLogo from '../../assets/image/google-icon.jpg';
import FirebaseHelper from '../../helper/firebase';
import { Alert } from 'antd';
import 'antd/es/alert/style/css';
import StellarBase from 'stellar-sdk';

const { login, insertAddress, updateAddress } = FirebaseHelper;

const FormAddress = ({
  title,
  description,
  btnCaption,
  btnStyle,
  titleStyle,
  contentWrapper,
  descriptionStyle,
  hintTextStyle,
  googleButtonStyle,
  record,
  user,
}) => {
  const [msg, setMessage] = useState({ errCode: -1, message: '' });
  const [state, setState] = useState({ user: user, mode: 'add' });
  const [input, setInput] = useState({
    isLoading: false,
    address: '',
    stellar_addr: '',
    memo: '',
  });

  const handleSigning = () => {
    login('google').then(result => {
      setState({ ...state, user: result.user });
    });
  };

  const handleSubmit = () => {
    //Verification and validation data
    if (!state.user) {
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
    //Mode Add
    if (state.mode === 'add') {
      insertAddress(
        state.user.email,
        input.address,
        input.stellar_addr,
        input.memo
      ).then(res => {
        res.errMsg === ''
          ? setMessage({
              errCode: 0,
              message: 'Federation successfully listed',
            })
          : setMessage({ errCode: 1, message: res.errMsg });
        setInput({ ...input, isLoading: false });
      });
    }
    //Mode Edit
    else {
      updateAddress(input).then(res => {
        res.errMsg === ''
          ? setMessage({
              errCode: 0,
              message: 'Federation successfully listed',
            })
          : setMessage({ errCode: 1, message: res.errMsg });
        setInput({ ...input, isLoading: false });
      });
    }
  };

  const editData = () => {
    if (record && record.address && record.address !== input.address) {
      setInput({ ...input, ...record });
      setState({ ...state, mode: 'edit' });
    }
  };

  const clearData = () => {
    record.address = '';
    setInput({ ...input, address: '', stellar_addr: '', memo: '' });
    setState({ ...state, mode: 'add' });
  };

  useEffect(() => {
    editData();
  });

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
        title={state.mode === 'add' ? btnCaption : 'Edit'}
        onClick={handleSubmit}
        isLoading={input.isLoading}
        disabled={input.isLoading}
        {...btnStyle}
      />
      {state.mode === 'edit' && (
        <Button
          title="cancel "
          variant="textButton"
          onClick={clearData}
          style={{ fontSize: '14px' }}
        />
      )}
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
    <FormAddressWrapper>
      <Box {...contentWrapper}>
        <Heading
          content={state.mode === 'add' ? title : 'Edit Address'}
          {...titleStyle}
        />
        <Text
          content={
            state.user
              ? `Hello ${state.user.displayName} ${description}`
              : description
          }
          {...descriptionStyle}
        />
        {state.mode === 'edit' ? (
          <Text
            content={input.address + '*mystellar.id'}
            {...descriptionStyle}
          ></Text>
        ) : (
          <Input
            inputType="text"
            value={input.address}
            onChange={res => {
              setInput({ ...input, address: res });
            }}
            isMaterial
            label="myStellar.id Address"
          />
        )}

        <Text
          content={
            input.address
              ? `Your address will be ${input.address}*mystellar.id`
              : ''
          }
          {...hintTextStyle}
        />
        <Input
          inputType="text"
          value={input.stellar_addr}
          onChange={res => {
            setInput({ ...input, stellar_addr: res });
          }}
          isMaterial
          label="Stellar Address"
        />
        <Input
          inputType="text"
          onChange={res => {
            setInput({ ...input, memo: res });
          }}
          value={input.memo}
          isMaterial
          label="Memo (Optional)"
        />
        <AlertMessage />
        <div>
          <LoginButtonGroup isLoggedIn={!!state.user} />
        </div>
      </Box>
    </FormAddressWrapper>
  );
};

// Login style props
FormAddress.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  btnCaption: PropTypes.string,
  titleStyle: PropTypes.object,
  hintTextStyle: PropTypes.object,
  contentWrapper: PropTypes.object,
  descriptionStyle: PropTypes.object,
  googleButtonStyle: PropTypes.object,
  record: PropTypes.object,
  defaultUser: PropTypes.object,
};

// Login default style
FormAddress.defaultProps = {
  // Title default style
  titleStyle: {
    fontSize: ['22px', '36px', '40px'],
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

export default FormAddress;
