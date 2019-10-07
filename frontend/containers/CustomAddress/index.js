import React from 'react';
import PropTypes from 'prop-types';
import Box from '../../elements/Box';
import Image from '../../elements/Image';
import Text from '../../elements/Text';
import Heading from '../../elements/Heading';
import Button from '../../elements/Button';
import FeatureBlock from '../../components/FeatureBlock';
import Container from '../../components/UI/Container';
import CustomAddressWrapper from './CustomAddress.style';
import BackgroundImg from '../../assets/image/partner-bg.png';
import Router from 'next/router';

const CustomAddress = ({
  row,
  col,
  title,
  description,
  btnStyle,
  sectionSubTitle,
}) => {
  return (
    <CustomAddressWrapper id="partners">
      <Image
        src={BackgroundImg}
        className="backgroungImg"
        alt="backgroungImg"
      />
      <Container>
        <Box className="row" {...row}>
          <Box className="col" {...col} style={{ flexDirection: 'column' }}>
            <Text {...sectionSubTitle} />
            <FeatureBlock
              title={<Heading {...title} />}
              description={<Text {...description} />}
              button={
                <Button
                  title="Create Domain"
                  {...btnStyle}
                  onClick={_ => {
                    Router.push('/login');
                  }}
                />
              }
            />
          </Box>
        </Box>
      </Container>
    </CustomAddressWrapper>
  );
};

// Partner style props
CustomAddress.propTypes = {
  sectionHeader: PropTypes.object,
  sectionTitle: PropTypes.object,
  sectionSubTitle: PropTypes.object,
  row: PropTypes.object,
  col: PropTypes.object,
};

// Partner default style
CustomAddress.defaultProps = {
  // Partner section row default style
  row: {
    flexBox: true,
    flexWrap: 'wrap',
  },
  // Partner section col default style
  col: {
    width: [1],
    flexBox: true,
    alignSelf: 'center',
  },
  // Partner section title default style
  title: {
    content: 'YES, You can use your own domain as federation Address',
    fontSize: ['24px', '26px', '30px', '36px', '48px'],
    fontWeight: '300',
    color: '#0f2137',
    letterSpacing: '-0.010em',
    mb: '20px',
    maxWidth: '100%',
    textAlign: 'center',
  },
  // Partner section description default style
  description: {
    content:
      'Just sign up and we guide you how to setup federation domain using your own domain. No need additional server and technical code savvy. ' +
      'Only clicks away.',
    fontSize: '16px',
    color: '#343d48cc',
    lineHeight: '2.1',
    mb: '33px',
    textAlign: 'center',
  },
  sectionSubTitle: {
    content: 'YOUR OWN DOMAIN?',
    as: 'span',
    fontSize: '14px',
    letterSpacing: '0.13em',
    fontWeight: '700',
    color: '#1a73e8',
    mb: '10px',
    textAlign: 'center',
  },
  // Button default style
  btnStyle: {
    borderRadius: '4px',
    minWidth: '156px',
    fontSize: '14px',
    fontWeight: '500',
  },
};

export default CustomAddress;
