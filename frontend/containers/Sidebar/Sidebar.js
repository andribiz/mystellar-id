import React from 'react';

import Link from 'next/link';
import { Layout, Menu } from 'antd';
import SidebarWrapper from './sidebar.style';
import Logo from './Logo';
import { siteConfig } from '../../data/index';
import menus from '../../data/menu';
import { width } from 'styled-system';

const { Sider } = Layout;

const Sidebar = ({ collapsed, toggleCollapsed }) => {
  const isCollapsed = collapsed;
  // const { app, toggleOpenDrawer, height } = this.props;
  const mode = collapsed === true ? 'vertical' : 'inline';
  let scrollheight = process.browser && window.innerWidth;

  const styling = {
    // backgroundColor: customizedTheme.backgroundColor,
  };

  const submenuStyle = {
    backgroundColor: 'rgba(0,0,0,0.3)',
    // color: customizedTheme.textColor,
  };
  const submenuColor = {
    // color: customizedTheme.textColor,
  };
  const url = siteConfig.dashboard;

  // const isMobile = () => window.innerWidth <= 768;

  return (
    <SidebarWrapper>
      <Sider
        trigger={null}
        collapsible={true}
        collapsed={isCollapsed}
        width={240}
        className="isomorphicSidebar"
        // hidden={true}
        // onMouseEnter={toggleMenu}
        // onMouseLeave={toggleMenu}
      >
        <Logo collapsed={collapsed} />
        <Menu theme="dark" mode={mode} className="isoDashboardMenu">
          {menus.map((menu, key) => {
            return (
              <Menu.ItemGroup key={key} title={menu.group}>
                {menu.items.map((item, idx) => {
                  return (
                    <Menu.Item key={`${key}${idx}`}>
                      <Link href={`${url}${item.path}`}>
                        <a className="isoMenuHolder" style={submenuColor}>
                          <i className={item.icon} />
                          <span className="nav-text">{item.name}</span>
                        </a>
                      </Link>
                    </Menu.Item>
                  );
                })}
              </Menu.ItemGroup>
            );
          })}
        </Menu>
      </Sider>
    </SidebarWrapper>
  );
};

export default Sidebar;
