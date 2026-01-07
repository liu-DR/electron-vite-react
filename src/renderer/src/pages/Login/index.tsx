import './index.less';
import { Button } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.electronReturnVal?.onUpdateValue((event, args) => {
      console.log(event, args, 'event, args');
    });
  }, []);

  return (
    <div className="loginContain">
      <div id="draggableArea"></div>
      欢迎来到
      <h2>Electron React</h2>
      <Button type="primary" onClick={() => navigate('/home')}>
        前往首页
      </Button>
      <Button type="primary" onClick={() => navigate('/hello')}>
        前往欢迎页
      </Button>
      <Button
        onClick={() => {
          window.electron.ipcRenderer.sendMessage('toMain', '测试通信');
        }}
      >
        测试通信
      </Button>
      <Button
        onClick={() => {
          window.electron.ipcRenderer.sendMessage(
            'getMainWindow',
            '测试通信111',
          );
        }}
      >
        实例化
      </Button>
      <Button
        onClick={() => {
          window.electron.ipcRenderer.sendMessage('switchWindowSize', 'min');
        }}
      >
        最小化
      </Button>
      <Button
        onClick={() => {
          window.electron.ipcRenderer.sendMessage('destoryWindow', '关闭窗口');
        }}
      >
        关闭窗口
      </Button>
    </div>
  );
};

export default Login;
