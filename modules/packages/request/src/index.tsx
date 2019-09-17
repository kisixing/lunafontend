import { extend, ExtendOptionsInit } from 'umi-request';
import { getErrData, Iconfig, RequestOptions } from './types';
import { message, notification } from 'antd';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const getErrData: getErrData = error => {
  const { response } = error;
  const errortext = codeMessage[response.status] || response.statusText;
  const { status, url } = response;
  const mes = { status, errortext, url };
  console.log(mes);
  return mes;
};

let request = extend({});

const defaultConfig: ExtendOptionsInit = {
  errorHandler: getErrData, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  timeout: 5000,
  headers: {
    Accept: 'application/json',
  },
};

const config = (configs: Iconfig) => {
  const { errHandler = () => {}, Authorization = '', ...others } = configs;
  request = extend({
    ...defaultConfig,
    ...others,
    errorHandler: err => {
      const { status, errortext, url } = getErrData(err);
      errHandler({ status, errortext, url });

      notification.error({
        message: `请求错误 ${status}: ${url}`,
        description: errortext,
      });
      if (status === 401) {
        notification.error({
          message: '未登录或登录已过期，请重新登录。',
        });
      }
    },
  });

  // request拦截器, 改变url 或 options.
  request.interceptors.request.use((url, options) => {
    // eslint-disable-next-line no-param-reassign
    options.headers = {
      ...options.headers,
      Authorization,
    };
    return { url, options };
  });

  request.interceptors.response.use((response: Response, options: RequestOptions) => {
    console.log('response', response, options);
    const { successText, onErr } = options;
    const { status, url } = response;
    // eslint-disable-next-line no-param-reassign
    if ([200, 304].includes(status)) {
      successText && message.success(successText);
    } else {
      const errortext = codeMessage[response.status] || response.statusText;
      onErr({ status, errortext, url });
    }
    return response;
  });
};

export { config };
export const post = (url: string, options: RequestOptions) => {
  return request.post(url, options);
};
export default request;
