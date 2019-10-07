import React, { isValidElement, useState } from 'react';
import StepRegisterWrapper from './StepRegister.style';
import Input from '../../elements/Input';
import FirebaseHelper from '../../helper/firebase';
import Box from '../../elements/Box';
import PropTypes from 'prop-types';
import Button from '../../elements/Button';
import { Alert, Form } from 'antd';
import Text from '../../elements/Text';
import Heading from '../../elements/Heading';

const StepRegister = ({
  titleStyle,
  btnStyle,
  descriptionStyle,
  user,
  nextStep,
}) => {
  const { isValidDomain } = FirebaseHelper;
  const [msg, setMessage] = useState({ errCode: -1, message: '' });
  const [input, setInput] = useState({
    isLoading: false,
    step: 0,
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

    const res = await isValidDomain(user, input.domain);
    if (res.errMsg === '') {
      setMessage({
        errCode: 0,
        message: 'Valid domain',
      });
      setInput({ ...input, step: 1, isLoading: false });
    } else {
      setInput({ ...input, isLoading: false });
      setMessage({ errCode: 1, message: res.errMsg });
    }
  };

  return (
    <StepRegisterWrapper>
      <Box>
        <Heading content={'Register your Domain'} {...titleStyle} />
        <Text
          content={
            'Add your own domain to register your own federation domain name'
          }
          {...descriptionStyle}
        />
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
      <AlertMessage />
      <Box>
        <Button
          className="default"
          title="Check"
          onClick={handleSubmit}
          isLoading={input.isLoading}
          disabled={input.isLoading}
          {...btnStyle}
        />
        {input.step === 1 && (
          <Button
            className="withoutBg"
            variant="textButton"
            title="Next >"
            onClick={_ => {
              nextStep(input.domain);
            }}
            disabled={input.isLoading}
            {...btnStyle}
          />
        )}
      </Box>
    </StepRegisterWrapper>
  );
};

StepRegister.propTypes = {
  titleStyle: PropTypes.object,
  btnStyle: PropTypes.object,
  descriptionStyle: PropTypes.object,
  user: PropTypes.object,
  nextStep: PropTypes.func,
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
