import { routesType } from './data';

export const routes: Array<routesType> = [
  {
    path: '/',
    id: 'hello-page',
    lazyPath: '../components/HelloPage',
  },
  {
    path: '/home',
    id: 'home',
    lazyPath: '@/pages/Home',
  },
  {
    path: '/login',
    id: 'login',
    lazyPath: '@/pages/Login',
  },
];
