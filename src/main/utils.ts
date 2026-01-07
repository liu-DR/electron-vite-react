/** 工具函数 */
import path from 'path';

// 获取不同平台的图标路径
export const getIconPath = () => {
  if (process.platform === 'win32') {
    return path.resolve(__dirname, '../../resources/personal_kit.ico');
  } else if (process.platform === 'darwin') {
    return path.resolve(__dirname, '../../resources/personal_kit.icns');
  }
  return path.resolve(__dirname, '../../resources/personal_kit.png');
};
