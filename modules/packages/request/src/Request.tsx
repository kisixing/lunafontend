// import { message } from 'antd';
import { extend, RequestMethod } from 'umi-request';
import { Iconfig, RequestOptions } from './types';
import getErrData from './getErrData';
// import { notification } from 'antd';

const notification = require('antd/lib/notification').default
const message = require('antd/lib/message').default
import store from 'store'

type RequestType = <T>(url: string, options?: RequestOptions) => Promise<T>;
const intervalSet: Set<string> = new Set();
export default class Request {
  public _request: RequestMethod = null;
  constructor() {
    this.init();
  }
  public init = (configs: Iconfig = {}) => {
    const { errHandler, prefix = '', timeout = 10000, ...others } = configs;


    this._request = extend({
      prefix: prefix.startsWith('/') ? prefix : (prefix.includes('://') ? prefix : `http://${prefix}`),
      timeout,
      // credentials: 'include', // 默认请求是否带上cookie
      headers: {
        Accept: 'application/json',
      },
      errorHandler: (arg) => {
        const { response, request } = arg

        if (response) {
          const errorData = getErrData(response);
          errHandler && errHandler(errorData);
          return Promise.reject(errorData);
        } else if (request) {
          const { options, url } = request
          if (options && !(options as any).hideErr) {
            notification.error({
              message: `服务器未响应请求`,
              // message: `${url} 未响应`,
            });
          }
          return Promise.reject(`${url} no response`);
        }
        return Promise.reject(arg);

      },
      ...others,
    });
    this.intercept();
  };
  public intercept() {
    ['get', 'post', 'put', 'delete'].forEach(_ => {
      this[_] = ((url, options = {}) => {
        const { loading, interval, cacheWhenFailed } = options;
        const key = _ + ':' + url;

        if (typeof interval === 'number') {
          if (intervalSet.has(key)) {
            return Promise.reject('interval !');
          }
          intervalSet.add(key);
          setTimeout(() => {
            intervalSet.delete(key);
          }, interval);
        }
        const promise: Promise<any> = this._request[_](url, options);
        if (loading !== undefined) {
          const hide = message.loading(loading, 0);
          return promise.finally(() => {
            hide();
          });
        }
        if (cacheWhenFailed) {

          return promise.then(value => {
            store.set(key, value)
            return value
          }).catch(err => {
            console.log('cacheWhenFailed')
            return store.get(key)
          });
        }
        return promise;
      }) as RequestType;
    });
  }
  post: RequestType;
  get: RequestType;
  put: RequestType;
  delete: RequestType;
}
