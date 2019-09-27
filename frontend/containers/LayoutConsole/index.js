import React, { Component } from 'react';
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

class MyApp extends Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false };
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }

  toggleCollapsed() {
    this.setState({ collapsed: !this.state.collapsed });
    console.log(this.state.collapsed);
  }

  render() {
    const { children } = this.props;

    return (
      <ThemeProvider theme={appTheme}>
        <>
          <AdminCSS />
          <AppHolder>
            <Layout style={{ height: '100vh' }}>
              <Topbar
                collapsed={this.state.collapsed}
                toggleCollapsed={this.toggleCollapsed}
              />

              <Layout style={{ flexDirection: 'row', overflowX: 'hidden' }}>
                <Sidebar collapsed={this.state.collapsed} />
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
                    {children}
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
  }
}

export default withAuthorization(MyApp);
