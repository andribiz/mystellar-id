import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '../../elements/Box';
import Heading from '../../elements/Heading';
import Button from '../../elements/Button';
import ListMystellarWrapper from './ListUsersWrapper.style';
import FirebaseHelper from '../../helper/firebase';
import {
  Alert,
  Divider,
  Table,
  Select,
  Form,
  Modal,
  Popconfirm,
  notification,
  Input,
} from 'antd';
import 'antd/es/alert/style/css';

import Text from '../../elements/Text';

const { Column } = Table;
const {
  onSnapshotDomain,
  onSearchDomain,
  insertAddress,
  deleteFed,
  updateAddress,
} = FirebaseHelper;
const { Option } = Select;

const modalFormAddress = ({
  visible,
  onCancel,
  onCreate,
  form,
  msg,
  record,
}) => {
  const { getFieldDecorator } = form;

  const AlertMessage = () => {
    if (msg.errCode === 0)
      return <Alert message={msg.message} type="success" showIcon />;
    else if (msg.errCode === 1)
      return <Alert message={msg.message} type="error" showIcon />;
    return null;
  };

  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText={record.address ? 'Edit' : 'Create'}
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form layout="vertical">
        <Form.Item label="MyStellar Address">
          {getFieldDecorator('address', {
            rules: [{ disabled: true, message: 'Please input' }],
            initialValue: record.address,
          })(<Input disabled={!!record.address ? true : false} />)}
        </Form.Item>
        <Form.Item label="Stellar Address">
          {getFieldDecorator('stellar_addr', {
            rules: [
              { required: true, message: 'Please input Stellar Address' },
            ],
            initialValue: record.stellar_addr,
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Memo (Optional)">
          {getFieldDecorator('memo', {
            rules: [{ required: false }],
            initialValue: record.memo,
          })(<Input />)}
        </Form.Item>
      </Form>
      <AlertMessage />
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
  const [input, setInput] = useState({
    isLoading: false,
    address: '',
    stellar_addr: '',
    memo: '',
    email: user.email,
    mode: 'add',
  });
  const [forms, setForm] = useState(null);
  const [domains, setDomain] = useState('');

  const saveFormRef = formRef => {
    setForm(formRef);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleChange = record => {
    setVisible(true);
    setInput({
      address: record.address,
      stellar_addr: record.stellar_addr,
      memo: record.memo,
      domain: domains,
      mode: 'edit',
    });
  };

  const openNotification = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const handleCreate = () => {
    const form = forms;

    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      if (input.mode === 'edit') {
        setInput({
          ...input,
          email: user.email,
          stellar_addr: values.stellar_addr,
          memo: values.memo,
        });
        const res = await updateAddress({
          email: user.email,
          stellar_addr: values.stellar_addr,
          memo: values.memo,
          domain: domains,
          address: input.address,
        });
        if (!!res.errMsg) {
          setMessage({ errCode: 1, message: res.errMsg });
        } else {
          data.map(MapData, values);
          setData(data);
          form.resetFields();
          setVisible(false);
        }
      } else {
        const res = await insertAddress(
          user.email,
          domains,
          values.address,
          values.stellar_addr,
          values.memo || null
        );

        if (!!res.errMsg) {
          setMessage({ errCode: 1, message: res.errMsg });
        } else {
          form.resetFields();
          setVisible(false);
          setData([
            ...data,
            {
              address: values.address + '*' + domains,
              email: user.email,
              memo: values.memo,
              stellar_addr: values.stellar_addr,
              memo_type: values.memo_type,
            },
          ]);
        }
      }
      console.log('Received values of form: ', values);
    });
  };

  const handleSubmit = () => {
    setInput({ stellar_addr: '', address: '', memo: '' });
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

  const onChangeDomain = async domainVal => {
    setDomain(domainVal);
    console.log(domains);
    const dt = await onSearchDomain(user, domainVal);
    setData(dt);
  };

  function MapData(item) {
    console.log(this.address);
    if (item.address === this.address) {
      item.stellar_addr = this.stellar_addr;
      item.memo = this.memo;
    }
    return item;
  }

  const onSnapshot = snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        setData(data => [...data, toJson(change.doc)]);
      } else if (change.type === 'modified') {
        setData(data => data.map(MapData, change.doc.data()));
      }
    });
  };

  const removeFed = async record => {
    const result = await deleteFed(record);
    if (result.errMsg === '') {
      setData(data => data.filter(row => row.address != record));
      openNotification('success', 'Address has been deleted');
    } else {
      openNotification('error', result.errMsg);
    }
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
    const domain = onSnapshotDomain(user, onSnapshotDom);
    return () => {
      domain();
    };
  }, []);

  const LoginButtonGroup = ({ isLoggedIn }) => (
    <Fragment>
      <Button
        className="default"
        title="I'm Ready"
        onClick={handSubmit}
        isLoading={input.isLoading}
        disabled={input.isLoading}
        {...btnStyle}
      />
    </Fragment>
  );

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
            visible={visible}
            onCancel={handleCancel}
            onCreate={handleCreate}
            ref={saveFormRef}
            msg={msg}
            record={input}
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
                <a onClick={() => handleChange(record)}>Change</a>
                <Divider type="vertical" />
                <Popconfirm
                  title="Are you sure want to delete this address?"
                  okText={'Delete'}
                  onConfirm={() => removeFed(record.address)}
                >
                  <a>Delete</a>
                </Popconfirm>
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
