import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import Box from '../../elements/Box';
import Text from '../../elements/Text';
import Heading from '../../elements/Heading';
import Input from '../../elements/Input';
import CheckBox from '../../elements/Checkbox/index';
import Button from '../../elements/Button';
import Image from '../../elements/Image';
import LoginWrapper from './login.style';
import 'rc-tabs/assets/index.css';
import LoginImage from '../../assets/image/background-login.jpg';
import GoogleLogo from '../../assets/image/google-icon.jpg';
import FirebaseHelper from '../../helper/firebase';
import { Alert } from 'antd';
import Router from 'next/router';
const { login, register, insertUser } = FirebaseHelper;

const Login = ({
  row,
  col,
  btnStyle,
  logoStyle,
  titleStyle,
  contentWrapper,
  outlineBtnStyle,
  descriptionStyle,
  googleButtonStyle,
}) => {
  const [state, setState] = useState({ email: '', password: '' });
  const [stateReg, setStateReg] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [stateNotify, setStateNotify] = useState({
    isLoading: false,
    errMessage: '',
    loginMessage: '',
  });

  const handleLogin = method => {
    setStateNotify({ isLoading: true, loginMessage: '' });
    login(method, state.email, state.password)
      .then(res => {
        if (res.additionalUserInfo.isNewUser) {
          insertUser(
            res.user.uid,
            res.user.email,
            res.user.displayName,
            res.user.photoURL
          )
            .then(() => {
              console.log('Document successfully written!');
              setStateNotify({ isLoading: false, loginMessage: '' });
            })
            .catch(e => {
              setStateNotify({ isLoading: false, loginMessage: e.message });
            });
        }
      })
      .catch(error => {
        setStateNotify({ isLoading: false, loginMessage: error.message });
      });
  };

  const handleRegister = () => {
    setStateNotify({ isLoading: true, errMessage: '' });

    register(stateReg.email, stateReg.password)
      .then(res => {
        insertUser(
          res.user.uid,
          res.user.email,
          stateReg.name,
          res.user.photoURL
        )
          .then(() => {
            console.log('Document successfully written!');
            setStateNotify({ isLoading: false, loginMessage: '' });
          })
          .catch(e => {
            setStateNotify({ isLoading: false, loginMessage: e.message });
          });
        setStateNotify({ isLoading: false, errMessage: '' });
      })
      .catch(error => {
        setStateNotify({ isLoading: false, errMessage: error.message });
      });
  };

  const LoginButtonGroup = () => (
    <Fragment>
      <Button
        className="default"
        title="LOGIN"
        onClick={() => {
          handleLogin(FirebaseHelper.EMAIL);
        }}
        {...btnStyle}
      />
      <Button
        title="Forget Password"
        className={'withoutBg'}
        variant="textButton"
        {...outlineBtnStyle}
      />
    </Fragment>
  );
  const SignupButtonGroup = () => (
    <Fragment>
      <Button
        className="default"
        title={stateNotify.isLoading ? 'PROCESSING' : 'REGISTER'}
        onClick={handleRegister}
        isLoading={stateNotify.isLoading}
        // disabled={stateNotify.isLoading}
        {...btnStyle}
      />
    </Fragment>
  );

  return (
    <LoginWrapper>
      <Box className="row" {...row}>
        <Box className="col imageCol" {...col}>
          <Image className="patternImage" src={LoginImage} alt="Login Banner" />
        </Box>
        <Box className="col tabCol" {...col}>
          <Box {...contentWrapper}>
            <Tabs
              defaultActiveKey="loginForm"
              renderTabBar={() => <ScrollableInkTabBar />}
              renderTabContent={() => <TabContent />}
            >
              <TabPane tab="LOGIN" key="loginForm">
                <Heading content={`Welcome Folk`} {...titleStyle} />
                <Text
                  content="Welcome to MyStellar ID. Please login with your personal account information letter."
                  {...descriptionStyle}
                />
                <Button
                  icon={<Image src={GoogleLogo} alt="Google Icon" />}
                  title="Sign in with Google"
                  iconPosition="left"
                  className="google-login__btn"
                  onClick={() => {
                    handleLogin(FirebaseHelper.GOOGLE);
                  }}
                  {...googleButtonStyle}
                />

                <Input
                  inputType="email"
                  isMaterial
                  label="Email Address"
                  value={state.email}
                  onChange={value => setState({ ...state, email: value })}
                />
                <Input
                  inputType="password"
                  isMaterial
                  value={state.password}
                  onChange={value => setState({ ...state, password: value })}
                  label="Password"
                />
                <CheckBox
                  id="remember"
                  htmlFor="remember"
                  labelText="Remember Me"
                />
                <div>
                  <LoginButtonGroup />
                </div>
              </TabPane>
              <TabPane tab="REGISTER" key="registerForm">
                <Heading content="Welcome Folk" {...titleStyle} />
                <Text
                  content="Welcome to MyStellar ID. Please register with your personal account information letter."
                  {...descriptionStyle}
                />
                <Button
                  icon={<Image src={GoogleLogo} alt="Google Icon" />}
                  title="Sign up with Google"
                  iconPosition="left"
                  className="google-login__btn"
                  {...googleButtonStyle}
                  onClick={() => {
                    handleLogin(FirebaseHelper.GOOGLE);
                  }}
                />
                <Input
                  isMaterial
                  inputType="text"
                  value={stateReg.name}
                  onChange={value => setStateReg({ ...stateReg, name: value })}
                  label="Full Name"
                />
                <Input
                  inputType="email"
                  isMaterial
                  value={stateReg.email}
                  onChange={value => setStateReg({ ...stateReg, email: value })}
                  label="Email Address"
                />
                <Input
                  inputType="password"
                  isMaterial
                  value={stateReg.password}
                  onChange={value =>
                    setStateReg({ ...stateReg, password: value })
                  }
                  label="Password"
                />
                {stateNotify.errMessage && (
                  <Alert
                    message={stateNotify.errMessage}
                    type="error"
                    showIcon
                  />
                )}
                <div style={{ paddingTop: '20px' }}>
                  <SignupButtonGroup />
                </div>
              </TabPane>
            </Tabs>
          </Box>
        </Box>
      </Box>
    </LoginWrapper>
  );
};

// Login style props
Login.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
  logoStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  hintTextStyle: PropTypes.object,
  contentWrapper: PropTypes.object,
  descriptionStyle: PropTypes.object,
  googleButtonStyle: PropTypes.object,
};

// Login default style
Login.defaultProps = {
  // Team member row default style
  row: {
    flexBox: true,
    flexWrap: 'wrap',
  },
  // Team member col default style
  col: {
    width: [1, 1 / 2],
  },
  // Default logo size
  logoStyle: {
    width: '128px',
    height: 'auto',
    ml: '15px',
  },
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
  // Content wrapper style
  contentWrapper: {
    pl: ['17px', '32px', '38px', '40px', '56px'],
    pr: '32px',
    pb: ['32px', '56px'],
  },
  // Default button style
  btnStyle: {
    minWidth: '156px',
    fontSize: '14px',
    fontWeight: '500',
  },
  // Outline button outline style
  outlineBtnStyle: {
    minWidth: '156px',
    fontSize: '14px',
    fontWeight: '500',
    color: 'rgb(26, 115, 232)',
  },
  // Google button style
  googleButtonStyle: {
    bg: '#ffffff',
    color: '#343D48',
  },
};
//

export default Login;
