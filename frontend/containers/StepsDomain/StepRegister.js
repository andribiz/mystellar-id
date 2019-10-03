import React from 'react';
import Box from '../../elements/Box';
import Heading from '../../elements/Heading';
import StepRegisterWrapper from './StepRegister.style';
// import Input from '../../elements/Input';
import Input from '../../elements/Input';
import StellarBase from 'stellar-sdk';
import FormAddressWrapper from '../FormAddress/formAddress.style';

const StepRegister = ({ contentWrapper }) => {
  return (
    <StepRegisterWrapper>
      <div className="card">
        <Input inputType="text" isMaterial label="Enter your domain name" />
      </div>
    </StepRegisterWrapper>
  );
};

export default StepRegister;
