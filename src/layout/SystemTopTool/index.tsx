import './index.less';
import {
  MinusOutlined,
  CloseOutlined,
  BorderOutlined,
  SwitcherOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useMemoizedFn } from 'ahooks';

const HeaderContainer = () => {
  const [isMax, setIsMax] = useState<boolean>(false);

  const operationClick = useMemoizedFn((key: string) => {
    switch (key) {
      case 'close':
        window.electron.ipcRenderer.sendMessage('destoryWindow');
        break;
      case 'switch':
        window.electron.ipcRenderer.sendMessage('switchWindowSize', 'switch');
        break;
      default:
        window.electron.ipcRenderer.sendMessage('switchWindowSize', 'min');
        break;
    }
  });

  useEffect(() => {
    window.exampleApi.isMaximized((event, args) => {
      setIsMax(args);
    });
  }, []);

  return (
    <div className="header-container">
      <div className="container-left">my-app</div>
      <div id="container-draggableArea" />
      <div className="container-right">
        <div className="right-system-edit">
          <div className="operation-icon" onClick={() => operationClick('min')}>
            <MinusOutlined />
          </div>
          <div
            className="operation-icon"
            onClick={() => operationClick('switch')}
          >
            {isMax ? <SwitcherOutlined /> : <BorderOutlined />}
          </div>
          <div
            className="operation-icon close-icon"
            onClick={() => operationClick('close')}
          >
            <CloseOutlined />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderContainer;
