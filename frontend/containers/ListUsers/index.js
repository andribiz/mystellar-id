import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '../../elements/Box';
import Heading from '../../elements/Heading';
import Button from '../../elements/Button';
import ListMystellarWrapper from './ListUsersWrapper.style';
import FirebaseHelper from '../../helper/firebase';
import { Alert, Divider, Table, Select, Form, Modal } from 'antd';
import 'antd/es/alert/style/css';
import FormAddress from '../FormAddress';
import Input from '../../elements/Input';
import Text from '../../elements/Text';

const { Column } = Table;
const { onSnapshotFed, onSnapshotDomain, onSearchDomain } = FirebaseHelper;
const { Option } = Select;

const modalFormAddress = ({ visible, onCancel, onCreate, form, domain }) => {
  const [input, setInput] = useState({
    address: '',
    stellar_addr: '',
    memo: '',
  });

  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <FormAddress id="myForm" modal={true} domain={domain} />
    </Modal>
  );
};

const AddressCreateForm = Form.create({ name: 'form_in_modal' })(
  modalFormAddress
);

const ListUsers = ({
  btnStyle,
  titleStyle,
  contentWrapper,
  descriptionStyle,
  hintTextStyle,
  googleButtonStyle,
  user,
}) => {
  const [data, setData] = useState([]);
  const [msg, setMessage] = useState({ errCode: -1, message: '' });
  const [options, setOptions] = useState([]);
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState({ isLoading: false, value: '' });
  const [forms, setForm] = useState(null);

  const handleSigning = () => {
    login('google').then(result => {
      setUser(result.user);
    });
  };

  const saveFormRef = formRef => {
    setForm(formRef);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCreate = () => {
    const form = formRef.props;
    // console.log('Received values of form: ', values);
    //  form.resetFields();
    //  this.setState({ visible: false });
  };

  const handleSubmit = () => {
    setVisible(true);
  };

  const toJson = doc => {
    const dt = doc.data();
    return {
      address: doc.id,
      email: dt.email,
      memo: dt.memo,
      stellar_addr: dt.stellar_addr,
      memo_type: dt.memo_type,
    };
  };

  const onChangeDomain = async value => {
    const dt = await onSearchDomain(user, value);
    setData(dt);
    setInput({ ...input, value: value });
  };

  const onSnapshot = snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        setData(data => [...data, toJson(change.doc)]);
      }
    });
  };

  const onSnapshotDom = snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        setOptions(options => [
          ...options,
          { value: change.doc.id, label: change.doc.data().domain },
        ]);
      }
    });
  };

  useEffect(() => {
    const snap = onSnapshotFed(user, onSnapshot);
    const domain = onSnapshotDomain(user, onSnapshotDom);
    return () => {
      snap();
      domain();
    };
  }, []);

  const LoginButtonGroup = ({ isLoggedIn }) => (
    <Fragment>
      <Button
        className="default"
        title="I'm Ready"
        onClick={handleSubmit}
        isLoading={input.isLoading}
        disabled={input.isLoading}
        {...btnStyle}
      />
    </Fragment>
  );

  const AlertMessage = () => {
    if (msg.errCode === 0)
      return <Alert message={msg.message} type="success" showIcon />;
    else if (msg.errCode === 1)
      return <Alert message={msg.message} type="error" showIcon />;
    return null;
  };

  return (
    <ListMystellarWrapper>
      <Box {...contentWrapper}>
        <Box>
          <Heading content="Your Addresses" {...titleStyle} />
          <Button
            className="default"
            title="Add"
            onClick={handleSubmit}
            isLoading={input.isLoading}
            disabled={input.isLoading}
            {...btnStyle}
          />
          <AddressCreateForm
            ref={saveFormRef}
            visible={visible}
            onCancel={handleCancel}
            onCreate={handleCreate}
            domain={input.value}
          />
          <br />
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChangeDomain}
            // onFocus={onFocus}
            // onBlur={onBlur}
            // onSearch={onSearch}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="">---</Option>
            {options.map(item => (
              <Option value={item.label}>{item.label}</Option>
            ))}
          </Select>
        </Box>

        <Table dataSource={data}>
          <Column title="Federation" dataIndex="address" key="address" />
          <Column
            title="Stellar Addr"
            dataIndex="stellar_addr"
            key="stellar_addr"
          />
          <Column title="Memo Type" dataIndex="memo_type" key="memo_type" />
          <Column title="Memo" dataIndex="memo" key="memo" />
          <Column
            title="Action"
            key="Action"
            render={(text, record) => (
              <span>
                <a>Change</a>
                <Divider type="vertical" />
                <a>Delete</a>
              </span>
            )}
          />
        </Table>
      </Box>
    </ListMystellarWrapper>
  );
};

// Login style props
ListUsers.propTypes = {
  btnStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  hintTextStyle: PropTypes.object,
  contentWrapper: PropTypes.object,
  descriptionStyle: PropTypes.object,
  googleButtonStyle: PropTypes.object,
};

// Login default style
ListUsers.defaultProps = {
  // Title default style
  titleStyle: {
    fontSize: ['22px', '36px', '40px'],
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
  hintTextStyle: {
    color: 'rgba(52, 61, 72, 0.8)',
    fontSize: '12px',
    lineHeight: '20px',
    letterSpacing: '-0.025em',
    mb: '10px',
    mt: '-20px',
    ml: '1px',
  },
  // Content wrapper style
  contentWrapper: {
    pl: ['17px', '32px', '38px', '40px', '56px'],
    pr: '32px',
    pb: '32px',
  },
  // Default button style
  btnStyle: {
    minWidth: '156px',
    fontSize: '14px',
    fontWeight: '500',
  },
  // Google button style
  googleButtonStyle: {
    bg: '#ffffff',
    color: '#343D48',
  },
};

export default ListUsers;
