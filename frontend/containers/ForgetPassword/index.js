import React from 'react';
import Input from '../../elements/Input';
import Button from '../../elements/Button';
import ForgotPasswordStyleWrapper from '../../containers/ForgetPassword/fogetPassword.style';

const ForgetPassword = () => {
  return (
    <ForgotPasswordStyleWrapper>
      {/*<div className="isoForgotPassForm">*/}
      {/*  <div className="isoInputWrapper">*/}
      {/*    <Input size="large" placeholder="Email" />*/}
      {/*  </div>*/}

      {/*  <div className="isoInputWrapper">*/}
      {/*    <Button type="primary" title="Send Request"/>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div>
        <div>
          <Input size="large" placeholder="Email" />
        </div>

        <div>
          <Button type="primary" title="Send Request" />
        </div>
      </div>
    </ForgotPasswordStyleWrapper>
  );
};

export default ForgetPassword;
