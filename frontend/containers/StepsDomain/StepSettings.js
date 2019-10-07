import React, { useEffect, useState } from 'react';
import Box from '../../elements/Box';
import Heading from '../../elements/Heading';
import StepSettingsWrapper from './StepSettings.style';
import Text from '../../elements/Text';
import PropTypes from 'prop-types';
import Button from '../../elements/Button';
import { Alert } from 'antd';
import { isVerifiedDomain } from '../../helper/DomainUtils';
import FirebaseHelper from '../../helper/firebase';

const { insertDomain, getStorageUrl } = FirebaseHelper;

const StepSetting = ({
  titleStyle,
  btnStyle,
  descriptionStyle,
  prevStep,
  nextStep,
  domain,
  user,
}) => {
  const [msg, setMessage] = useState({ errCode: -1, message: '' });
  const [state, setState] = useState({
    isLoading: false,
    step: 0,
    verified: false,
    url: '',
  });

  useEffect(() => {
    getStorageUrl('stellar.toml').then(url => {
      setState({ ...state, url: url });
    });
  }, []);

  const AlertMessage = () => {
    if (msg.errCode === 0)
      return <Alert message={msg.message} type="success" showIcon />;
    else if (msg.errCode === 1)
      return <Alert message={msg.message} type="error" showIcon />;
    return null;
  };

  const handleVerify = () => {
    setState({ ...state, isLoading: true });
    isVerifiedDomain(domain, res => {
      setMessage(res);
      res.errCode === 0
        ? setState({ isLoading: false, step: 1, verified: true })
        : setState({ ...state, isLoading: false });
    });
  };

  const handleSave = async () => {
    setState({ ...state, isLoading: true });
    const res = await insertDomain(user, domain);
    if (res.errMsg === '') {
      setMessage({
        errCode: 0,
        message: 'Domains valid listed',
      });
      setState({ ...state, step: 2, isLoading: false });
    } else {
      setState({ ...state, isLoading: false });
      setMessage({ errCode: 1, message: res.errMsg });
    }
  };

  return (
    <StepSettingsWrapper>
      <Box>
        <Heading content={'Setting your server'} {...titleStyle} />
        <Text
          className="text"
          content={'Here its the rules. '}
          {...descriptionStyle}
        />
        <Text
          className="text"
          dangerouslySetInnerHTML={{
            __html:
              '1. Upload config file <a href=' +
              state.url +
              '>(stellar.toml)</a>' +
              ' to your server with directory root/.well-known/stellar.toml.',
          }}
          {...descriptionStyle}
        />
        <Text
          className="text"
          content={'2. Your Domain must be use https.'}
          {...descriptionStyle}
        />
        <Text
          className="text"
          content={
            '3. You must enable CORS on your server so clients can send requests'
          }
          {...descriptionStyle}
        />
        <Text
          className="text"
          dangerouslySetInnerHTML={{
            __html:
              'Need more help? <a href="https://www.stellar.org/developers/guides/concepts/federation.html">click this link</a>' +
              '. Done? Now you need to validate your domain.',
          }}
          {...descriptionStyle}
        />
        <Heading content={'Validate your domain'} {...titleStyle} />
      </Box>

      <Box>
        <AlertMessage />
        {state.step <= 1 && (
          <Button
            className="withoutBg"
            variant="textButton"
            title="< Prev"
            onClick={prevStep}
            disabled={state.isLoading}
            {...btnStyle}
          />
        )}
        {state.step === 0 && (
          <Button
            className="default"
            title="Verify"
            onClick={handleVerify}
            isLoading={state.isLoading}
            disabled={state.isLoading}
            {...btnStyle}
          />
        )}
        {state.step === 1 && (
          <Button
            className="default"
            title="Save Domain"
            onClick={handleSave}
            isLoading={state.isLoading}
            disabled={state.isLoading}
            {...btnStyle}
          />
        )}
        {state.step === 2 && (
          <Button
            className="withoutBg"
            variant="textButton"
            title="Next >"
            onClick={nextStep}
            disabled={state.isLoading}
            {...btnStyle}
          />
        )}
      </Box>
    </StepSettingsWrapper>
  );
};

StepSetting.propTypes = {
  titleStyle: PropTypes.object,
  btnStyle: PropTypes.object,
  descriptionStyle: PropTypes.object,
  user: PropTypes.object,
  nextStep: PropTypes.func,
  prevStep: PropTypes.func,
  domain: PropTypes.string,
};

StepSetting.defaultProps = {
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
    mb: '1px',
    ml: '1px',
  },
};

export default StepSetting;
