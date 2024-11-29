import './index.less';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import HeaderContainer from '@/components/HeaderContainer';

const HelloPage = () => {
  const navigate = useNavigate();

  return (
    <div className="hello-page">
      <HeaderContainer />

      <div style={{ paddingTop: 42 }}>
        <Button type="primary" onClick={() => navigate('/login')}>
          登录页
        </Button>
      </div>
    </div>
  );
};

export default HelloPage;
