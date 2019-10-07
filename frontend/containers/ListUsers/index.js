import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '../../elements/Box';
import Heading from '../../elements/Heading';
import Button from '../../elements/Button';
import ListMystellarWrapper from './ListUsersWrapper.style';
import FirebaseHelper from '../../helper/firebase';
import { Alert, Divider, Table, Select, Form, Modal } from 'antd';
import 'antd/es/alert/style/css';

import Input from '../../elements/Input';

const { Column } = Table;
const {
  onSnapshotFed,
  onSnapshotDomain,
  onSearchDomain,
  insertAddress,
} = FirebaseHelper;
const { Option } = Select;

const modalFormAddress = ({ visible, onCancel, onCreate, form, msg }) => {
  const [input, setInput] = useState({
    address: '',
    stellar_addr: '',
    memo: '',
  });

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
      okText="Create"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form layout="vertical">
        <Form.Item label="MyStellar Address">
          {getFieldDecorator('address', {
            rules: [{ required: true, message: 'Please input' }],
            initialValue: '',
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Stellar Address">
          {getFieldDecorator('stellar_addr', {
            rules: [
              { required: true, message: 'Please input Stellar Address' },
            ],
            initialValue: '',
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Memo (Optional)">
          {getFieldDecorator('memo', {
            rules: [{ required: false }],
            initialValue: '',
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
  actionWrapper,
  actionStyle,
  domainStyle,
  user,
}) => {
  const [data, setData] = useState([]);
  const [msg, setMessage] = useState({ errCode: -1, message: '' });
  const [options, setOptions] = useState([]);
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState({ isLoading: false, domain: '' });
  const [forms, setForm] = useState(null);

  const saveFormRef = formRef => {
    setForm(formRef);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCreate = () => {
    const form = forms;
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      const res = await insertAddress(
        user.email,
        input.domain,
        values.address,
        values.stellar_addr,
        values.memo || null
      );

      if (!!res.errMsg) {
        setMessage({ errCode: 1, message: res.errMsg });
      } else {
        setVisible(false);
        setData([
          ...data,
          {
            address: values.address,
            email: user.email,
            memo: values.memo,
            stellar_addr: values.stellar_addr,
            memo_type: values.memo_type,
          },
        ]);
      }

      console.log('Received values of form: ', values);
    });
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

  const onChangeDomain = async domain => {
    const dt = await onSearchDomain(user, domain);
    setData(dt);
    setInput({ ...input, domain: domain });
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
    const snap = onSnapshotFed(user, input.domain, onSnapshot);
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
        onClick={handSubmit}
        isLoading={input.isLoading}
        disabled={input.isLoading}
        {...btnStyle}
      />
    </Fragment>
  );

  return (
    <ListMystellarWrapper>
      <AddressCreateForm
        visible={visible}
        onCancel={handleCancel}
        onCreate={handleCreate}
        ref={saveFormRef}
        msg={msg}
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
                <Option value={item.label}>{item.label}</Option>
              ))}
            </Select>
          </Box>
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
};

export default ListUsers;
