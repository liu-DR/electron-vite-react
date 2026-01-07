import './index.less';
import { lazy, Suspense, useMemo } from 'react';
import { useMemoizedFn } from 'ahooks';

import { lazyPathMap } from '../routes';

interface PropsType {
  id?: string;
  lazyPath?: string;
}

const SuspenseLazyWrap = (props: PropsType) => {
  /** 用于获取动态路径对应的模块对象 */
  const getFullModule = () => {
    const { lazyPath, id } = props;
    const modules = import.meta.glob('../../**/*[.]tsx');

    /**
     * 第一种方法，规定路由模块的入口文件已index.tsx开始
     * 第二种方法，根据映射关系，指定需要加载的路由模块的入口文件路径
     */
    const fullPath = id && lazyPathMap[id];
    const element: any = modules[`../../${fullPath || lazyPath}.tsx`]();

    return element;
  };

  const FallbackWrap = useMemoizedFn(() => {
    return (
      <div className="suspense-lazy">
        <div className="loader"></div>
      </div>
    );
  });

  const lazyWrap = useMemo(() => {
    const Component = lazy(() => getFullModule());
    return (
      <Suspense fallback={FallbackWrap()}>
        <Component />
      </Suspense>
    );
  }, [props]);

  return (
    <div id="suspense-lazy" className="suspense">
      {lazyWrap}
    </div>
  );
};

export default SuspenseLazyWrap;
