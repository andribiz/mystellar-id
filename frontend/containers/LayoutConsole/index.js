import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { appTheme } from '../../theme';
import AppHolder from '../../containers/LayoutConsole/commonStyle';
import { Layout } from 'antd';
import Topbar from '../../containers/Topbar/Topbar';
import Sidebar from '../../containers/Sidebar/Sidebar';
import { siteConfig } from '../../data';
import { AdminCSS } from '../../assets/css/admin-style';
import withAuthorization from '../../helper/withAuthorization';

const { Content, Footer } = Layout;

const LayoutConsole = ({ windowSize, children, user }) => {
  const [state, setState] = useState({ collapsed: false, mode: 'desktop' });

  useEffect(() => {
    if (windowSize.innerWidth > 1220 && state.mode !== 'desktop') {
      setState({ collapsed: false, mode: 'desktop' });
    } else if (
      windowSize.innerWidth > 767 &&
      windowSize.innerWidth < 1220 &&
      state.mode !== 'mobile'
    ) {
      setState({ collapsed: true, mode: 'mobile' });
    }
  });

  const toggleCollapsed = () => {
    setState({ ...state, collapsed: !state.collapsed });
  };

  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, { user: user })
  );

  return (
    <ThemeProvider theme={appTheme}>
      <>
        <AdminCSS />
        <AppHolder>
          <Layout style={{ height: '100vh' }}>
            <Topbar
              collapsed={state.collapsed}
              toggleCollapsed={toggleCollapsed}
              user={user}
            />

            <Layout style={{ flexDirection: 'row', overflowX: 'hidden' }}>
              <Sidebar
                collapsed={state.collapsed}
                toggleCollapsed={toggleCollapsed}
                view={state.mode}
              />
              <Layout
                className="isoContentMainLayout"
                style={{
                  height: '100vh',
                }}
              >
                <Content
                  className="isomorphicContent"
                  style={{
                    padding: '70px 0 0',
                    flexShrink: '0',
                    background: '#f1f3f6',
                    width: '100%',
                  }}
                >
                  {childrenWithProps}
                </Content>
                <Footer
                  style={{
                    background: '#ffffff',
                    textAlign: 'center',
                    borderTop: '1px solid #ededed',
                  }}
                >
                  {siteConfig.footerText}
                </Footer>
              </Layout>
            </Layout>
          </Layout>
        </AppHolder>
      </>
    </ThemeProvider>
  );
};

export default withAuthorization(LayoutConsole);
