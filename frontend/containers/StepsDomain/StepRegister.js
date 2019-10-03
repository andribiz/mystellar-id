import React from 'react';
import Box from '../../elements/Box';
import Heading from '../../elements/Heading';
import StepRegisterWrapper from './StepRegister.style';

const StepRegister = () => {
  return (
    <StepRegisterWrapper>
      <div className="card">
        {/*<h1>Registration</h1>*/}
        <form>
          <h1>Hello</h1>
          <p>Enter your name:</p>
          <input type="text" />
        </form>
      </div>
    </StepRegisterWrapper>
  );
};

export default StepRegister;
