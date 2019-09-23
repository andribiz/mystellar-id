import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Fade from 'react-reveal/Fade';
import Box from '../../elements/Box';
import Text from '../../elements/Text';
import Heading from '../../elements/Heading';
import Button from '../../elements/Button';
import Card from '../../elements/Card';
import Image from '../../elements/Image';
import FeatureBlock from '../../components/FeatureBlock';
import Container from '../../components/UI/Container';
import StellarRocket from '../../assets/image/mystellar-rocket.png';
import StellarSend from '../../assets/image/mystellar-send.png';

const InfoSection = ({
  sectionWrapper,
  row,
  col,
  title,
  description,
  button,
  textArea,
  imageArea,
  textAreaRow,
  imageAreaRow,
  imageWrapper,
  imageWrapperOne,
  imageWrapperTwo,
  sectionSubTitle,
  btnStyle,
}) => {
  return (
    <Box {...sectionWrapper}>
      <Container fullWidth noGutter className="control-sec-container">
        <Box {...row} {...imageAreaRow}>
          <Box {...col} {...imageArea}>
            <Card {...imageWrapper} {...imageWrapperOne}>
              <Fade left>
                <Image src={StellarRocket} alt="MyStellar Federation Address" />
              </Fade>
            </Card>
            <Card {...imageWrapper} {...imageWrapperTwo}>
              <Fade bottom>
                <Image src={StellarSend} alt="Mystellar.id Address" />
              </Fade>
            </Card>
          </Box>
        </Box>
      </Container>
      <Container>
        <Box {...row} {...textAreaRow}>
          <Box {...col} {...textArea}>
            <Text content="WHAT IS" {...sectionSubTitle} />
            <FeatureBlock
              title={
                <Heading
                  content="Stellar Federation Address ??"
                  {...title}
                />
              }
              description={
                <Text
                  content="The Stellar Federation Address is an identifier which incorporates your Stellar account id and memo addresses.
                  Instead using GBXXXXX stellar address, now you can use email-like john*mystellar.id as your stellar ID. Stellar protocol will translate it to you own stellar address (GBXXX...). Cool, isn't it?"
                  {...description}
                />
              }
              button={
                  <a href="https://www.stellar.org/developers/guides/concepts/federation.html" target="_blank">
                    <Button title="LEARN MORE" {...button} {...btnStyle} />
                  </a>
              }
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

InfoSection.propTypes = {
  sectionWrapper: PropTypes.object,
  row: PropTypes.object,
  col: PropTypes.object,
  title: PropTypes.object,
  description: PropTypes.object,
  button: PropTypes.object,
  btnStyle: PropTypes.object,
};

InfoSection.defaultProps = {
  sectionWrapper: {
    as: 'section',
    pt: ['40px', '80px'],
    pb: ['40px', '80px'],
  },
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    ml: '-15px',
    mr: '-15px',
  },
  textAreaRow: {
    flexDirection: 'row-reverse',
  },
  col: {
    pr: '15px',
    pl: '15px',
  },
  textArea: {
    width: ['100%', '100%', '50%', '50%', '50%'],
  },
  imageArea: {
    width: ['100px', '100px', '53%', '50%', '50%'],
    flexBox: true,
  },
  imageWrapper: {
    boxShadow: 'none',
  },
  imageWrapperOne: {
    pointerEvents: 'none',
  },
  imageWrapperTwo: {
    alignSelf: 'flex-end',
    mb: '-60px',
    ml: ['0px', '0px', '-200px', '-250px', '-400px'],
    pointerEvents: 'none',
  },
  sectionSubTitle: {
    as: 'span',
    display: 'block',
    fontSize: '14px',
    letterSpacing: '0.11em',
    fontWeight: '700',
    color: '#1a73e8',
    textTransform: 'uppercase',
    mb: '10px',
    textAlign: ['center', 'left'],
  },
  title: {
    fontSize: ['24px', '26px', '30px', '36px', '48px'],
    fontWeight: '300',
    color: '#0f2137',
    letterSpacing: '-0.010em',
    mb: '20px',
    maxWidth: ['100%', '100%', '100%', '420px', '420px'],
    textAlign: ['center', 'left'],
  },
  description: {
    fontSize: '16px',
    color: '#343d48cc',
    lineHeight: '1.75',
    mb: '33px',
    maxWidth: ['100%', '100%', '100%', '440px', '440px'],
    textAlign: ['center', 'left'],
  },
  button: {
    type: 'button',
    fontSize: '14px',
    fontWeight: '600',
    color: '#fff',
    borderRadius: '4px',
    pl: '22px',
    pr: '22px',
    colors: 'primaryWithBg',
  },
  btnStyle: {
    minWidth: '156px',
    fontSize: '14px',
    fontWeight: '500',
  },
};

export default InfoSection;
