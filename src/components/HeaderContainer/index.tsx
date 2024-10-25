import './index.less';
import {
  MinusOutlined,
  CloseOutlined,
  BorderOutlined,
} from '@ant-design/icons';

const HeaderContainer = () => {
  return (
    <div className="header-container">
      <div className="container-left">left</div>
      <div id="container-draggableArea" />
      <div className="container-right">
        <div className="right-system-edit">
          <MinusOutlined />
          <CloseOutlined />
          <BorderOutlined />
        </div>
      </div>
    </div>
  );
};

export default HeaderContainer;
