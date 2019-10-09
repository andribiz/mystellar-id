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

const { Column } = Table;
const {
  onSnapshotDomain,
  onSearchAddressDomain,
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
  loading,
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
      title="Create a new Address"
      okText={'Save'}
      onCancel={onCancel}
      onOk={onCreate}
      confirmLoading={loading}
    >
      <Form layout="vertical">
        <Form.Item label="MyStellar Address">
          {getFieldDecorator('address', {
            rules: [{ disabled: true, message: 'Please input' }],
            initialValue: record.address,
          })(<Input disabled={record.mode === 'edit' ? true : false} />)}
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
        <AlertMessage />
      </Form>
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
  actionWrapper,
  actionStyle,
  domainStyle,
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
    mode: '',
  });
  const [forms, setForm] = useState(null);
  const [domains, setDomain] = useState('');

  const saveFormRef = formRef => {
    setForm(formRef);
  };

  const handleCancel = () => {
    forms.resetFields();
    setMessage({ errCode: -1, message: '' });
    setInput({});
    setVisible(false);
  };

  const handleChange = record => {
    forms.resetFields();
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
          isLoading: true,
        });
        const res = await updateAddress(
          values.address,
          values.stellar_addr,
          values.memo || ''
        );
        if (!!res.errMsg) {
          setInput({ isLoading: false, mode: 'edit' });
          setMessage({ errCode: 1, message: res.errMsg });
        } else {
          setInput({ isLoading: false, mode: 'edit' });
          setMessage({ errCode: -1, message: '' });
          form.resetFields();
          data.map(MapData, values);
          setData(data);

          setVisible(false);
        }
      } else {
        setInput({ ...input, isLoading: true });
        const res = await insertAddress(
          user.email,
          domains,
          values.address,
          values.stellar_addr,
          values.memo || ''
        );

        if (!!res.errMsg) {
          setMessage({ errCode: 1, message: res.errMsg });
          setInput({ isLoading: false, mode: 'add' });
        } else {
          form.resetFields();
          setVisible(false);
          setInput({ isLoading: false, mode: 'add' });
          setMessage({ errCode: -1, message: '' });
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
    });
  };

  const handleSubmit = () => {
    forms.resetFields();
    setInput({ mode: 'add' });
    setVisible(true);
  };

  const onChangeDomain = async domainVal => {
    setDomain(domainVal);
    const dt = await onSearchAddressDomain(user, domainVal);
    setData(dt);
  };

  function MapData(item) {
    if (item.address === this.address) {
      item.stellar_addr = this.stellar_addr;
      item.memo = this.memo;
    }
    return item;
  }

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

  return (
    <ListMystellarWrapper>
      <AddressCreateForm
        visible={visible}
        onCancel={handleCancel}
        onCreate={handleCreate}
        ref={saveFormRef}
        msg={msg}
        record={input}
        loading={input.isLoading}
      />
      <Box {...contentWrapper}>
        <Heading content="Your Addresses" {...titleStyle} />

        <Box {...actionWrapper}>
          <Box {...actionStyle}>
            <Button
              className="default"
              title="Add User"
              onClick={handleSubmit}
              isLoading={input.isLoading}
              disabled={input.isLoading}
              {...btnStyle}
            />
          </Box>
          <Box {...domainStyle}>
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Select domain"
              optionFilterProp="children"
              onChange={onChangeDomain}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {options.map(item => (
                <Option key={item.label} value={item.label}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </Box>
        </Box>

        <Table dataSource={data} scroll={{ x: 'max-content' }}>
          <Column
            title="Federation"
            dataIndex="address"
            key="address"
            fixed="left"
          />
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
            fixed="right"
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
  contentWrapper: PropTypes.object,
  actionWrapper: PropTypes.object,
  actionStyle: PropTypes.object,
  domainStyle: PropTypes.object,
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
  actionStyle: {
    width: ['100%', '100%', '50%', '50%', '50%'],
  },
  domainStyle: {
    width: ['100%', '100%', '50%', '50%', '50%'],
  },
  actionWrapper: {
    display: 'flex',
    padding: '10px',
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
