import './index.less';
import { Button } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();


  useEffect(() => {
    window.electronReturnVal?.onUpdateValue((event, args) => {
      console.log(event, args, 'event, args');
    })
  }, []);
  return (
    <div className="loginContain">
      <div id='draggableArea'></div>
      欢迎来到
      <h2>Electron React</h2>
      <Button type="primary" onClick={() => navigate('/home')}>
        前往首页
      </Button>
      <Button onClick={() => {
        window.electron.ipcRenderer.sendMessage('toMain', '测试通信')
      }}>打开新窗口</Button>
    </div>
  );
};

export default Login;
