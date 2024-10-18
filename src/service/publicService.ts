import { post, get } from '../utils/axios';

// 获取头像信息
export const getAvatarService = <T>(params: any): Promise<T> => {
  return get(
    `https://api.multiavatar.com/4645646/${params}?apikey=OoEq2Qdshzxk17`,
    {},
  );
};
