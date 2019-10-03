import React from 'react';
import Box from '../../elements/Box';
import Heading from '../../elements/Heading';
import StepFinishWrapper from './StepFinish.style';

const StepFinish = () => {
  return (
    <StepFinishWrapper>
      <div class="card">
        <div class="center">
          Now, ready to input your users address. Please go to menu “Your User”
          or click the button bellow
        </div>
      </div>
    </StepFinishWrapper>
  );
};

export default StepFinish;
