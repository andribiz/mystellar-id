import React, { useState } from 'react';
import Box from '../../elements/Box';
import Heading from '../../elements/Heading';
import StepSettingsWrapper from './StepSettings.style';
import Text from '../../elements/Text';
import PropTypes from 'prop-types';
import Button from '../../elements/Button';
import { Alert, Form } from 'antd';

const StepSetting = ({ titleStyle, btnStyle, descriptionStyle, nextStep }) => {
  const [msg, setMessage] = useState({ errCode: -1, message: '' });
  const [state, setState] = useState({
    isLoading: false,
  });

  const AlertMessage = () => {
    if (msg.errCode === 0)
      return <Alert message={msg.message} type="success" showIcon />;
    else if (msg.errCode === 1)
      return <Alert message={msg.message} type="error" showIcon />;
    return null;
  };

  return (
    <StepSettingsWrapper>
      {/*<Box className="image">*/}
      {/*  <img src={ImageSettings} className="streach"/>*/}
      {/*</Box>*/}
      <Box className="card">
        <Heading content={'Upload Config File'} {...titleStyle} />
        {/*<Text*/}
        {/*  content={*/}
        {/*    'Upload this file to your server with location ./.well-known/stellar.toml. ' +*/}
        {/*    'The request should be https://yourdomain/.well-known/stellar.toml.' +*/}
        {/*    'Domain must be use https. file must be corss. More help click this link'*/}
        {/*  }*/}
        {/*  {...descriptionStyle}*/}
        {/*/>*/}
        <Text
          className="text"
          content={
            'Upload this file to your server with location ./.well-known/stellar.toml. '
          }
          {...descriptionStyle}
        />
        <Text
          className="text"
          content={
            'The request should be https://yourdomain/.well-known/stellar.toml.'
          }
          {...descriptionStyle}
        />
        <Text
          className="text"
          content={
            'Domain must be use https. file must be corss. More help click this link'
          }
          {...descriptionStyle}
        />
        <Heading content={'Test Config File'} {...titleStyle} />
        <Text
          content={'Validate your setting with this config'}
          {...descriptionStyle}
        />
      </Box>

      <Box className="form">
        <AlertMessage />
        <Form layout="inline">
          <Form.Item>
            <Button
              className="default"
              title="Test"
              isLoading={state.isLoading}
              disabled={state.isLoading}
              {...btnStyle}
            />
          </Form.Item>
          <Form.Item>
            <Button
              className="default"
              title="Next"
              onClick={nextStep}
              isLoading={state.isLoading}
              disabled={state.isLoading}
              {...btnStyle}
            />
          </Form.Item>
        </Form>
      </Box>
    </StepSettingsWrapper>
  );
};

StepSetting.propTypes = {
  titleStyle: PropTypes.object,
  btnStyle: PropTypes.object,
  descriptionStyle: PropTypes.object,
  user: PropTypes.object,
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
