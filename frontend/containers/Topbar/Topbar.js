import React from 'react';
import { Layout } from 'antd';
import TopbarNotification from './topbarNotification';
import TopbarUser from './topbarUser';
import TopbarWrapper from './topbar.style';

const Topbar = ({ toggleCollapsed, collapsed, user }) => {
  // const [state, setState] = useState({selectedItem:""})

  const isCollapsed = collapsed;
  const { Header } = Layout;
  const styling = {
    position: 'fixed',
    width: '100%',
    height: 70,
  };

  return (
    <TopbarWrapper>
      <Header
        style={styling}
        className={
          isCollapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'
        }
      >
        <div className="isoLeft">
          <button
            className={
              isCollapsed ? 'triggerBtn menuCollapsed' : 'triggerBtn menuOpen'
            }
            style={{ color: `rgb(50, 51, 50)` }}
            onClick={toggleCollapsed}
          />
        </div>

        <ul className="isoRight">
          <li
            // onClick={() => setState({selectedItem: "user"})}
            className="isoUser"
          >
            <TopbarUser user={user} />
          </li>
        </ul>
      </Header>
    </TopbarWrapper>
  );
};

export default Topbar;
