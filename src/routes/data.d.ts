import { ReactNode } from 'react'

export interface routesType {
  /** 页面路由 */
  path?: string
  /** 页面名称 */
  title?: string
  /** 自定义属性 */
  meta?: {
    title: string
    key: string
    icon: ReactNode
  }
  /** 页面文件 */
  element: (props: any) => ReactNode
  /** 子路由配置 */
  children?: Array<routesType>
}
