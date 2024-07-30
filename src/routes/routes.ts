import { lazy } from 'react'
import { routesType } from './data'

const Home = lazy(() => import('../pages/Home'))
const Login = lazy(() => import('../pages/Login'))

export const routes: Array<routesType> = [
  {
    path: '/',
    element: Home
  },
  {
    path: '/login',
    element: Login
  }
]
