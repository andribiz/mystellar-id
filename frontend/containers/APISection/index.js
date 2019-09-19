import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Box from '../../elements/Box';
import Text from '../../elements/Text';
import Heading from '../../elements/Heading';
import Input from '../../elements/Input';
import Button from '../../elements/Button';
import Container from '../../components/UI/Container';
import APISectionWrapper, {ToolWrapperForm} from './APISection.style';
import {FederationServer} from "stellar-sdk";
import {Alert} from "antd";
import "antd/es/alert/style/css";

const APISection = ({
  sectionHeader,
  sectionTitle,
  sectionSubTitle,
  buttonStyle,
}) => {
  const [state, setState] = useState({isLoading:false, federation:"" ,resultMsg: "", statusCode:-1})

  const handleSubmit = () => {
    setState({...state, isLoading:true});

    FederationServer.resolve(state.federation)
      .then(federationRecord => {
        setState({isLoading:false,
                        resultMsg: ["Your Account ID is "+federationRecord.account_id,
                                    federationRecord.memo_type ? "memo Type: "+federationRecord.memo_type : "",
                                    federationRecord.memo ? "memo : "+ federationRecord.memo : ""],
                        statusCode: 0})
      })
      .catch(error => {
        setState({isLoading:false, resultMsg: error.message,statusCode: 1});
      });
  };

  const AlertMessage = () => {
        if (state.statusCode === 0)
            return (
                <Alert
                     message="Successfully"
                     description={state.resultMsg.map( (item) => (
                         <span style={{display: "block"}}>
                           {item}
                         </span>
                           ))}
                     type="success"
                     showIcon
                 />
            )
        else if (state.statusCode === 1)
            return (
                <Alert
                     message={state.resultMsg}
                     type="error"
                     showIcon
                 />
            );
        return (null);
  }


  return (
    <APISectionWrapper id="tools">
      <Container>
        <Box {...sectionHeader}>
          <Text {...sectionSubTitle} />
          <Heading {...sectionTitle} />
        </Box>
        <Box>
          <ToolWrapperForm>
            <Input
              inputType="email"
              isMaterial={false}
              value={state.federation}
              onChange={result => {setState({...state, federation: result})}}
              placeholder="Your Stellar Federation Address"
            />
            <Button
                isLoading={state.isLoading}
                disabled={state.isLoading}
                onClick={handleSubmit}
                type="button" title="Test Me" {...buttonStyle}
            />
          </ToolWrapperForm>
          <AlertMessage/>

        </Box>
      </Container>
    </APISectionWrapper>
  );
};

// APISection style props
APISection.propTypes = {
  sectionHeader: PropTypes.object,
  sectionTitle: PropTypes.object,
  sectionSubTitle: PropTypes.object,
  buttonStyle: PropTypes.object,
};

// APISection default style
APISection.defaultProps = {
  // section header default style
  sectionHeader: {
    mb: ['30px', '30px', '30px', '56px'],
  },
  sectionSubTitle: {
    content: 'TOOLS',
    as: 'span',
    display: 'block',
    fontSize: '14px',
    letterSpacing: '0.13em',
    fontWeight: '700',
    color: '#1a73e8',
    mb: '10px',
    textAlign: ['center'],
  },
  // section title default style
  sectionTitle: {
    content: 'Check Your Own Federation Address',
    fontSize: ['20px', '24px', '24px', '24px', '30px'],
    fontWeight: '400',
    color: '#0f2137',
    letterSpacing: '-0.025em',
    mb: '0',
    textAlign: ['center'],
  },
  buttonStyle: {
    type: 'button',
    fontSize: '14px',
    fontWeight: '600',
    color: '#fff',
    borderRadius: '4px',
    pl: '22px',
    pr: '22px',
    colors: 'primaryWithBg',
  },

};

export default APISection;
