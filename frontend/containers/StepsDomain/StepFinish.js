import React from 'react';
import Box from '../../elements/Box';
import Heading from '../../elements/Heading';
import StepFinishWrapper from './StepFinish.style';
import PropTypes from 'prop-types';
import Text from '../../elements/Text';
import Button from '../../elements/Button';
import Link from 'next/link';
import ImageFinish from '../../assets/image/bg-finish-new.png';

const StepFinish = ({ titleStyle, btnStyle, descriptionStyle, restart }) => {
  return (
    <StepFinishWrapper>
      <Box className="image">
        <img src={ImageFinish} className="streach" />
      </Box>
      <Box className="card">
        <Heading content={'Horaay...'} {...titleStyle} />
        <Text
          content={
            'Everything has been setup. Now you could start to adding your user.'
          }
          {...descriptionStyle}
        />
      </Box>
      <Box className="button">
        <Link href={'/console/federation-user'}>
          <Button className="default" title="Create Your User" {...btnStyle} />
        </Link>
        <Button
          className="withoutBg"
          variant="textButton"
          title="Or Create another domain"
          onClick={restart}
          {...btnStyle}
        />
      </Box>
    </StepFinishWrapper>
  );
};

StepFinish.propTypes = {
  titleStyle: PropTypes.object,
  btnStyle: PropTypes.object,
  descriptionStyle: PropTypes.object,
  user: PropTypes.object,
  restart: PropTypes.func,
};

StepFinish.defaultProps = {
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

export default StepFinish;
