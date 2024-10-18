import { message } from 'antd';
import axios, { AxiosRequestConfig, AxiosRequestHeaders, Method } from 'axios';

const request = axios.create({
  // baseURL
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin-Type': '*',
  },
  timeout: 3 * 60 * 1000,
});

// 取消重复请求
let pending: Array<{
  url?: string;
  method?: Method;
  params: any;
  data: any;
  cancel: any;
}>;
const CancelToken = axios.CancelToken;

const removePending = (config: AxiosRequestConfig) => {
  pending.forEach((item, index) => {
    if (
      item.url === config.url &&
      item.method === config.method &&
      JSON.stringify(item.params) === JSON.stringify(config.params) &&
      JSON.stringify(item.data) === JSON.stringify(config.data)
    ) {
      item.cancel('操作太频繁，请稍后再试');
      pending.splice(index, 1);
    }
  });
};

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    removePending(config);
    config.cancelToken = new CancelToken((c) => {
      pending.push({
        url: config.url,
        method: (config as any).method,
        params: config.params,
        data: config.data,
        cancel: c,
      });
    });

    const headers = config.headers as AxiosRequestHeaders;
    // const token =
    config.headers = headers;
    return config;
  },
  (error) => {
    message.error(error?.data ?? '');
    return Promise.reject(error);
  },
);

// 响应拦截器
request.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      return Promise.resolve(res);
    }
    return Promise.reject(res);
  },
  (error) => {
    const { response } = error;
    if (response) {
      return Promise.reject(response);
    }
    return Promise.reject();
  },
);

export default request;
