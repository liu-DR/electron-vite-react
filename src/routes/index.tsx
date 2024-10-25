import { lazy, Suspense } from 'react';
import { useRoutes, RouteObject } from 'react-router-dom';
import { routes as rootRouter } from './routes';
import { routesType } from './data';

const RouterContent = () => {
  const lazyComponent = (lazyPath?: string) => {
    if (!lazyPath) return null;
    const LazyWrap = lazy(() => import('../components/HelloPage'));

    const Components = (
      <Suspense fallback="loading...">
        <LazyWrap />
      </Suspense>
    );

    return Components;
  };

  const deepRouters = (routers: routesType[]) => {
    if (!routers.length) {
      return [];
    }
    const preRouters: RouteObject[] = routers.map((route) => {
      const preRoute = {
        ...route,
        element: lazyComponent(route.lazyPath),
        children: route?.children?.length
          ? deepRouters(route?.children)
          : undefined,
      };

      if (!preRoute?.children?.length) {
        delete preRoute.children;
      }
      delete preRoute.lazyPath;

      return preRoute;
    });

    return preRouters;
  };

  const routers = useRoutes(deepRouters(rootRouter));
  return routers;
};

export default RouterContent;
