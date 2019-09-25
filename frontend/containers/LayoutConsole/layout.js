import React, {useEffect, useState} from 'react';
import {ThemeProvider} from 'styled-components';
import {Layout} from 'antd';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar';
import {appTheme} from '../../theme';
import {siteConfig} from '../../data/index';
import appActions from '../../redux/app/actions';
import AppHolder from './commonStyle';

const { toggleAll } = appActions;
const { Content, Footer } = Layout;

const LayoutConsole = ({
  App,
  isLoggedIn,
  children,
  toggleAll,
}) => {
  const [state, setState] = useState({collapsed: false})

    const toggleCollapsed = () => {
        setState({...state, collapsed: !state.collapsed});
        console.log(state.collapsed);
    }

  useEffect(() => {
    // toggleAll(width, height);
  });
  return (
        <ThemeProvider theme={appTheme}>
          <AppHolder>
            <Layout style={{ height: '100vh' }}>
              <Topbar collapsed={state.collapsed} toggleCollapsed={toggleCollapsed}/>

              <Layout style={{ flexDirection: 'row', overflowX: 'hidden' }}>
                <Sidebar collapsed={state.collapsed}/>
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
        </ThemeProvider>
  );
}

const mapStateToProps = state => {
  return {
    App: state.App,
  };
};

export default LayoutConsole;
