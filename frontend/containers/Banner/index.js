import React from 'react';
import PropTypes from 'prop-types';
import Box from '../../elements/Box';
import Text from '../../elements/Text';
import Heading from '../../elements/Heading';
import FeatureBlock from '../../components/FeatureBlock';
import ParticlesComponent from '../particles';
import Container from '../../components/UI/Container';
import { BannerCircleShape, BannerSquareShape } from '../app.style';

import FormAddress from '../FormAddress';

const DomainSection = ({
  SectionWrapper,
  row,
  col,
  title,
  smallTitle,
  description,
  formArea,
}) => {
  return (
    <Box {...SectionWrapper} id="home">
      <ParticlesComponent />
      <BannerSquareShape />
      <BannerCircleShape />
      <Container>
        <Box {...row}>
          <Box {...col}>
            <FeatureBlock title={<Heading {...title} />} />
            <FeatureBlock
              title={<Heading {...smallTitle} />}
              description={<Text {...description} />}
            />
          </Box>
          <Box {...formArea}>
            <FormAddress
              title={'Sign Me Up'}
              description={
                'Get your desired federation address with MyStellar.id domain in form below'
              }
              btnCaption={"I'm Ready"}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

DomainSection.propTypes = {
  SectionWrapper: PropTypes.object,
  row: PropTypes.object,
  col: PropTypes.object,
  title: PropTypes.object,
  smallTitle: PropTypes.object,
  description: PropTypes.object,
  button: PropTypes.object,
  btnStyle: PropTypes.object,
  btnStyleTwo: PropTypes.object,
  formArea: PropTypes.object,
};

DomainSection.defaultProps = {
  SectionWrapper: {
    as: 'section',
    pt: '85px',
    pb: '80px',
    overflow: 'hidden',
  },
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    ml: '-15px',
    mr: '-15px',
    alignItems: 'center',
  },
  imageAreaRow: {
    flexDirection: 'row-reverse',
  },
  col: {
    pr: '15px',
    pl: '15px',
    width: ['100%', '100%', '30%', '44%', '44%'],
    mt: '-80px',
  },
  formArea: {
    width: ['100%', '100%', '50%', '50%', '50%'],
    ml: 'auto',
    alignSelf: 'flex-end',
  },
  title: {
    content: 'FREE stellar federation Address',
    fontSize: ['26px', '30px', '30px', '48px', '60px'],
    fontWeight: '300',
    color: '#0f2137',
    letterSpacing: '-0.01px',
    mb: '20px',
  },
  smallTitle: {
    content: 'Yours*mystellar.id',
    fontSize: ['26px', '30px', '30px', '48px', '60px'],
    fontWeight: '300',
    color: '#0f2137',
    letterSpacing: '-0.01px',
    mb: '20px',
  },
  description: {
    content:
      'Create your own stellar federation address using domain mystellar.id.',
    fontSize: '16px',
    color: '#343d48',
    lineHeight: '33px',
    mb: '10px',
  },
  button: {
    title: 'EXPLORE MORE',
    type: 'button',
    fontSize: '14px',
    fontWeight: '600',
    color: '#fff',
    borderRadius: '4px',
    pl: '22px',
    pr: '22px',
    colors: 'primaryWithBg',
  },
  image: {
    ml: 'auto',
    mt: '70px',
  },
  btnStyle: {
    minWidth: '156px',
    fontSize: '14px',
    fontWeight: '500',
  },
  btnStyleTwo: {
    title: 'WATCH DEMOS',
    type: 'button',
    minWidth: '156px',
    fontSize: '14px',
    fontWeight: '500',
    ml: '15px',
    bg: '#fff',
    color: 'rgb(26, 115, 232)',
  },
  textArea: {
    width: ['100%', '100%', '50%', '55%', '55%'],
  },
};

export default DomainSection;
