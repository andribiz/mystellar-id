import React, { Component, useState } from 'react';
import { Popover } from 'antd';
import TopbarDropdownWrapper from './topbarDropdown.style';
import userpic from '../../assets/image/avatar.png';
import FirebaseHelper from '../../helper/firebase';
import { useRouter } from 'next/router';
import Image from '../../elements/Image';

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
      {/*<TopbarDropdownWrapper>*/}
      <div className="isoImgWrapper">
        {user.photoURL ? (
          <Image
            className="imageUser"
            src={user.photoURL}
            alt="user"
            style={{ width: 40, height: 40, borderRadius: 40 / 2 }}
          />
        ) : (
          <Image
            className="imageUser"
            src={userpic}
            alt="user"
            style={{ width: 40, height: 40, borderRadius: 40 / 2 }}
          />
        )}
        <span className="userActivity online" />
      </div>
      {/*</TopbarDropdownWrapper>*/}
    </Popover>
  );
};
export default TopbarUser;
