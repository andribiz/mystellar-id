import React from 'react';

import Link from 'next/link';
import {Layout, Menu} from 'antd';
import SidebarWrapper from './sidebar.style';

import Logo from './Logo';
import {siteConfig} from '../../data/index';
import menus from "../../data/menu";


const {Sider} = Layout;


const Sidebar = ({
                     collapsed,
                 }) => {
    const isCollapsed = collapsed;
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

    return (
        <SidebarWrapper>
            <Sider
                trigger={null}
                collapsible={true}
                collapsed={isCollapsed}
                width={240}
                className="isomorphicSidebar"
                // style={styling}
            >
                <Logo collapsed={collapsed}/>
                <Menu
                    // onClick={this.handleClick}
                    theme="dark"
                    mode={mode}
                    // openKeys={collapsed ? [] : app.openKeys}
                    // selectedKeys={app.current}
                    // onOpenChange={this.onOpenChange}
                    className="isoDashboardMenu"
                >
                    {menus.map( (menu, key) => {
                        return (
                            <Menu.ItemGroup
                              key={key}
                              title={menu.group}
                            >
                                {menu.items.map( (item, idx)=>{
                                    return (
                                        <Menu.Item key={`${key}${idx}`}>
                                            <Link href={`${url}${item.path}`}>
                                                <a className="isoMenuHolder" style={submenuColor}>
                                                    <i className={item.icon}/>
                                                    <span className="nav-text">
                                                        {item.name}
                                                    </span>
                                                </a>
                                            </Link>
                                        </Menu.Item>
                                    );
                                })}
                            </Menu.ItemGroup>
                        )
                    } )}
                </Menu>
            </Sider>
        </SidebarWrapper>
    );
}


export default Sidebar;
