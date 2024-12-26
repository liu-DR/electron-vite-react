import { useMemoizedFn } from 'ahooks';
import './index.less';
import { Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const HelloPage = () => {
  const navigate = useNavigate();

  const handleClick = useMemoizedFn(() => {
    /** 打开子窗口 */
  });

  return (
    <div className="hello-page">
      <div style={{ paddingTop: 42 }}>
        <Space>
          <Button type="primary" onClick={() => navigate('/login')}>
            登录页
          </Button>
          <Button onClick={handleClick}>掘金</Button>
        </Space>
      </div>
    </div>
  );
};

export default HelloPage;
