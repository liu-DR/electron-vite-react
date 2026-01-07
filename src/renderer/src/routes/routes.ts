import { routesType } from './data';

export const routes: Array<routesType> = [
  {
    path: '/home',
    id: 'Home',
    lazyPath: 'pages/Home',
  },
  {
    path: '/login',
    id: 'Login',
    lazyPath: 'pages/Login',
  },
];

/** 第二种动态匹配需要加载的文件模块的方法 */
export const lazyPathMap: Record<string, string> = {
  Home: 'pages/Home/index',
  Login: 'pages/Login/index',
};
