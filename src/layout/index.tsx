import './index.less';
import { ConfigProvider } from 'antd';

import SystemTopTool from './SystemTopTool';
import Route from '@/routes';

const Layout = () => {
  return (
    <ConfigProvider>
      <div className="root-layout">
        <SystemTopTool />
        <div className="layout-container">
          <div className="layout-sider"></div>
          <div className="layout-content">
            <Route />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Layout;
