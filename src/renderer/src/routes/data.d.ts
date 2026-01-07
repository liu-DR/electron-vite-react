import React from 'react';

export interface routesType {
  id: string;
  lazyPath: string;
  /** 页面路由 */
  path?: string;
  /** 页面名称 */
  title?: string;
  /** 自定义属性 */
  meta?: {
    title: string,
    key: string,
    icon: React.ReactNode
  };
  /** 页面文件 */
  element?: React.ReactNode | null;
  /** 子路由配置 */
  children?: Array<routesType>
};
