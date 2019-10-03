import React, { useState } from 'react';
import StepRegisterWrapper from './StepRegister.style';
import Input from '../../elements/Input';
import FirebaseHelper from '../../helper/firebase';
import Box from '../../elements/Box';
import PropTypes from 'prop-types';
import Button from '../../elements/Button';
import { Alert } from 'antd';
import Text from '../../elements/Text';
import Heading from '../../elements/Heading';

const { insertDomain } = FirebaseHelper;

const StepRegister = ({
  titleStyle,
  btnStyle,
  descriptionStyle,
  user,
  nextStep,
}) => {
  const [msg, setMessage] = useState({ errCode: -1, message: '' });
  const [input, setInput] = useState({
    isLoading: false,
    domain: '',
  });

  const AlertMessage = () => {
    if (msg.errCode === 0)
      return <Alert message={msg.message} type="success" showIcon />;
    else if (msg.errCode === 1)
      return <Alert message={msg.message} type="error" showIcon />;
    return null;
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setInput({ ...input, isLoading: true });
    const res = await insertDomain(user, input.domain);
    if (res.errMsg === '') {
      setMessage({
        errCode: 0,
        message: 'Federation successfully listed',
      });
      setInput({ ...input, isLoading: false });
    }
    //Mode Edit
    else {
      setInput({ ...input, isLoading: false });
      setMessage({ errCode: 1, message: res.errMsg });
    }
  };

  return (
    <StepRegisterWrapper>
      <Heading content={'Register your Domain'} {...titleStyle} />
      <Text
        content={
          'Add your own domain to register your own federation domain name'
        }
        {...descriptionStyle}
      />
      <Box className="card">
        <Input
          inputType="text"
          onChange={res => {
            setInput({ ...input, domain: res });
          }}
          value={input.domain}
          isMaterial
          label="Domain"
        />
      </Box>
      <Box>
        <AlertMessage />
        <Box>
          <Button
            className="default"
            title="Add"
            onClick={handleSubmit}
            isLoading={input.isLoading}
            disabled={input.isLoading}
            {...btnStyle}
          />
        </Box>
        <Box>
          <Button
            className="default"
            title="Next"
            onClick={nextStep}
            isLoading={input.isLoading}
            disabled={input.isLoading}
            {...btnStyle}
          />
        </Box>
      </Box>
    </StepRegisterWrapper>
  );
};

StepRegister.propTypes = {
  titleStyle: PropTypes.object,
  btnStyle: PropTypes.object,
  descriptionStyle: PropTypes.object,
  user: PropTypes.object,
};

StepRegister.defaultProps = {
  titleStyle: {
    fontSize: ['20px', '26px', '20px'],
    fontWeight: '400',
    color: '#20201D',
    letterSpacing: '-0.025em',
    mt: '35px',
    mb: '10px',
  },
  btnStyle: {
    minWidth: '156px',
    fontSize: '14px',
    fontWeight: '500',
  },
  descriptionStyle: {
    color: 'rgba(52, 61, 72, 0.8)',
    fontSize: '15px',
    lineHeight: '26px',
    letterSpacing: '-0.025em',
    mb: '23px',
    ml: '1px',
  },
};
export default StepRegister;
