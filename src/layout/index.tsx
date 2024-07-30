import { Navigate, useRoutes } from 'react-router-dom'
import { RouteObject } from './data'
// import route from './routes'

import Login from '../pages/Login'
import Home from '../pages/Home'

const rootRouter: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/login" />
  },
  {
    path: '/login',
    element: <Login />,
    key: 'login'
  },
  {
    path: '/home',
    element: <Home />,
    key: 'Home'
  }
  // ...route
]

const Route = () => {
  const routes = useRoutes(rootRouter)
  return routes
}

export default Route
