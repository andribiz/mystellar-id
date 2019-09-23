import React from 'react';
import PropTypes from 'prop-types';
import Box from '../../elements/Box';
import Text from '../../elements/Text';
import Logo from '../../elements/UI/Logo';
import Container from '../../components/UI/Container';
import FooterWrapper from './footer.style';
import LogoImage from '../../assets/image/logo.png';

const Footer = ({
  colTwo,
  logoStyle,
  textStyle,
  donateTextStyle,
  copyrightMenu,
  copyright,
}) => {
  return (
    <FooterWrapper>
      <Container>
          <Box {...colTwo} className="copyrightClass">
            <Logo
              href="#"
              logoSrc={LogoImage}
              title="App"
              logoStyle={logoStyle}
            />
            <Box {...copyright} className="copyrightText">
              <Text content="copyright 2019 mystellar.id." {...textStyle} />
            </Box>
            <Box {...copyrightMenu} className="copyrightMenu">
              <Text content="We welcome donation for our team to develop more: " {...textStyle}/>
              <Text content="donate*mystellar.id" {...textStyle} />
              <Text content="GB4J7WIQDHNPMNE246QOD6ICKKMGIGA5RV5VYHBHWZMPFJAVNMTO2UXQ" {...donateTextStyle}/>
            </Box>
          </Box>
          {/* End of footer List column */}
      </Container>
    </FooterWrapper>
  );
};

// Footer style props
Footer.propTypes = {
  colTwo: PropTypes.object,
  titleStyle: PropTypes.object,
  textStyle: PropTypes.object,
  donateTextStyle: PropTypes.object,
  logoStyle: PropTypes.object,
};

// Footer default style
Footer.defaultProps = {
  // Footer row default style

  // Footer col one style
  colTwo: {
    mt: [0, '13px'],
    mb: ['0px', 0],
    pl: ['15px', 0],
    pt: ['35px', '55px'],
    pr: ['15px', '15px', 0],
    borderTop: '1px solid',
    borderColor: 'rgba(0,0,0,0.102)',
    flexBox: true,
    flexWrap: 'wrap',
    width: ['100%'],
  },
  // widget title default style
  titleStyle: {
    color: '#343d48',
    fontSize: '16px',
    fontWeight: '700',
  },
  // Default logo size
  logoStyle: {
    width: 'auto',
    mb: ['15px', 0],
  },
  // widget text default style
  textStyle: {
    color: '#20201d',
    fontSize: '14px',
    mb: '10px',
    mr: '30px',
  },
  donateTextStyle: {
    color: '#20201d',
    fontSize: ['8px','10px','12px','14px'],
    mb: '10px',
    mr: ['0px','15px','30px'],
  },
  copyrightMenu: {
    flexBox: true,
    flexWrap: 'wrap',
    ml: [0, '40px'],
    mt: '3px',
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
    mb: ['15px', 0],
  },
  copyright: {
    ml: [0, 0, 0, 'auto', 'auto'],
    color: '#20201d',
    fontSize: '14px',
    mb: '10px',
    mt: '3px',
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default Footer;
