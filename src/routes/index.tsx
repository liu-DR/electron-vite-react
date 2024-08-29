import { useRoutes, RouteObject } from 'react-router-dom';
import { routes } from './routes';

const routerContent = () => {
  const routers = useRoutes(routes as unknown as RouteObject[]);
  return routers;
};

export default routerContent;
