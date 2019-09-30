import React from 'react';

import Link from 'next/link';
import { Layout, Menu } from 'antd';
import SidebarWrapper from './sidebar.style';
import Logo from './Logo';
import { siteConfig } from '../../data/index';
import menus from '../../data/menu';
import { width } from 'styled-system';
import Box from '../../elements/Box';

const { Sider } = Layout;

const Sidebar = ({ collapsed, toggleCollapsed, view }) => {
  const mode = collapsed === true ? 'vertical' : 'inline';

  const submenuStyle = {
    backgroundColor: 'rgba(0,0,0,0.3)',
    // color: customizedTheme.textColor,
  };
  const submenuColor = {
    // color: customizedTheme.textColor,
  };
  const url = siteConfig.dashboard;

  // const isMobile = () => window.innerWidth <= 768;

  const handleClick = e => {
    if (view === 'mobile' && !collapsed) {
      setTimeout(() => {
        toggleCollapsed();
      }, 100);
    }
  };

  return (
    <SidebarWrapper>
      <Sider
        trigger={null}
        collapsible={true}
        collapsed={collapsed}
        width={240}
        className="isomorphicSidebar"
        // hidden={collapsed}
        // onMouseEnter={toggleMenu}
        // onMouseLeave={toggleMenu}
      >
        <Logo collapsed={collapsed} />
        <Box style={{ overflow: 'auto' }}>
          <Menu
            theme="dark"
            mode={mode}
            className="isoDashboardMenu"
            onClick={handleClick}
          >
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
        </Box>
      </Sider>
    </SidebarWrapper>
  );
};

export default Sidebar;
