import React, { Component, useState } from 'react';
import { Popover } from 'antd';
import TopbarDropdownWrapper from './topbarDropdown.style';
import userpic from '../../assets/image/user.png';
import FirebaseHelper from '../../helper/firebase';
import { useRouter } from 'next/router';

const { logout } = FirebaseHelper;

const TopbarUser = ({ user }) => {
  const [state, setState] = useState({ visible: false });
  const router = useRouter();
  const handleVisibleChange = () => {
    setState({ visible: !state.visible });
  };

  const logoutRedirect = () => {
    logout();
    router.push('/');
  };
  const content = (
    <TopbarDropdownWrapper className="isoUserDropdown">
      <a className="isoDropdownLink" onClick={logoutRedirect}>
        Logout
      </a>
    </TopbarDropdownWrapper>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      visible={state.visible}
      onVisibleChange={handleVisibleChange}
      arrowPointAtCenter={true}
      placement="bottomLeft"
    >
      <div className="isoImgWrapper">
        {user.photoURL ? (
          <img alt="user" src={user.photoURL} />
        ) : (
          <img alt="user" src={userpic} />
        )}
        <span className="userActivity online" />
      </div>
    </Popover>
  );
};
export default TopbarUser;
