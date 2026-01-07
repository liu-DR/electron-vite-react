import { useRoutes, RouteObject, Navigate } from 'react-router-dom';
import { routes as rootRouter } from './routes';
import { routesType } from './data';

import SuspenseLazyWrap from './SuspenseLazyWrap';

const RouterContent = () => {
  const deepRouters = (routers: routesType[]) => {
    if (!routers.length) {
      return [];
    }
    const preRouters: RouteObject[] = routers.map((route) => {
      return {
        ...route,
        element: SuspenseLazyWrap(route),
        children: route?.children?.length
          ? deepRouters(route?.children)
          : undefined,
      };
    });
    return [{ path: '/', element: <Navigate to="/home" /> }, ...preRouters];
  };
  const routers = useRoutes(deepRouters(rootRouter));

  console.log(routers);

  return routers;
};

export default RouterContent;
