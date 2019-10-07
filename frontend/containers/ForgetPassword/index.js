import React, { useState } from 'react';
import Input from '../../elements/Input';
import Button from '../../elements/Button';
import ForgotPasswordStyleWrapper from '../../containers/ForgetPassword/fogetPassword.style';
import Box from '../../elements/Box';
import Heading from '../../elements/Heading';
import Text from '../../elements/Text';
import FirebaseHelper from '../../helper/firebase';
import PropTypes from 'prop-types';
import { Alert } from 'antd';

const { sendPasswordResetEmail } = FirebaseHelper;

const ForgetPassword = ({
  contentWrapper,
  titleStyle,
  descriptionStyle,
  btnStyle,
}) => {
  const [msg, setMessage] = useState({ errCode: -1, message: '' });
  const [stateForgot, setStateForgot] = useState({ email: '' });

  const AlertMessage = () => {
    if (msg.errCode === 0)
      return <Alert message={msg.message} type="success" showIcon />;
    else if (msg.errCode === 1)
      return <Alert message={msg.message} type="error" showIcon />;
    return null;
  };

  const hideErrMessage = seconds => {
    setTimeout(() => {
      setMessage({
        errCode: -1,
        message: '',
      });
    }, seconds);
  };

  const handleForgot = method => {
    if (!validEmailRegex.test(stateForgot.email)) {
      setMessage({
        errCode: 1,
        message: 'Please enter your valid email',
      });

      hideErrMessage(5000);
    } else {
      sendPasswordResetEmail(stateForgot.email)
        .then(() => {
          setMessage({
            errCode: 0,
            message: 'Please go to your email to reset your password',
          });
          hideErrMessage(5000);
        })
        .catch(e => {
          setMessage({
            errCode: 1,
            message: e.message,
          });
          hideErrMessage(10000);
        });

      setStateForgot({ email: '' });
    }
  };

  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  return (
    <ForgotPasswordStyleWrapper>
      <Box {...contentWrapper}>
        <Heading content={'Forgot Password ?'} {...titleStyle} />
        <Text
          content={'Enter your email and we send you a reset link'}
          {...descriptionStyle}
        />
        <Box>
          <Input
            className="inputEmail"
            size="large"
            placeholder="Email"
            value={stateForgot.email}
            onChange={value => setStateForgot({ ...stateForgot, email: value })}
          />
        </Box>
        <AlertMessage />
        <Box>
          {stateForgot.email !== '' && (
            <Button
              className="default"
              title="Send Request"
              {...btnStyle}
              onClick={() => {
                handleForgot(FirebaseHelper.GOOGLE);
              }}
            />
          )}
        </Box>
      </Box>
    </ForgotPasswordStyleWrapper>
  );
};

ForgetPassword.propTypes = {
  titleStyle: PropTypes.object,
  contentWrapper: PropTypes.object,
  descriptionStyle: PropTypes.object,
  btnStyle: PropTypes.object,
};

ForgetPassword.defaultProps = {
  titleStyle: {
    fontSize: ['22px', '26px', '40px'],
    fontWeight: '400',
    color: '#20201D',
    letterSpacing: '-0.025em',
    mt: '10px',
    mb: '10px',
  },

  contentWrapper: {
    pl: ['17px', '32px', '38px', '40px', '56px'],
    pr: '32px',
    pb: '32px',
  },

  descriptionStyle: {
    color: 'rgba(52, 61, 72, 0.8)',
    fontSize: '15px',
    lineHeight: '26px',
    letterSpacing: '-0.025em',
    mb: '23px',
    ml: '1px',
  },

  btnStyle: {
    minWidth: '156px',
    fontSize: '14px',
    fontWeight: '10',
  },
};

export default ForgetPassword;
