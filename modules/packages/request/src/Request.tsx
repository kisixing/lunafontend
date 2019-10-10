import { message } from 'antd';
import { extend, RequestMethod } from 'umi-request';
import { Iconfig, RequestOptions } from './types';
import getErrData from './getErrData';
import { notification } from 'antd';
import store from 'store'
type RequestType = (url: string, options?: RequestOptions) => Promise<any>;

const intervalSet: Set<string> = new Set();
export default class Request {
  public _request: RequestMethod = null;
  constructor() {
    this.init();
  }
  public init = (configs: Iconfig = {}) => {
    const { errHandler, ...others } = configs;


    this._request = extend({
      timeout: 5000,
      credentials: 'include', // 默认请求是否带上cookie
      headers: {
        Accept: 'application/json',
      },
      errorHandler: ({ response, request }) => {

        if (response) {
          const errorData = getErrData(response);
          errHandler && errHandler(errorData);
          Promise.reject(errorData);
        } else if (request) {
          let url = request.url
          url = url.slice(url.indexOf('://') + 3)
          url = url.slice(0, url.indexOf('/'))
          notification.error({
            message: `${url} 未响应`,
          });
        }
        Promise.reject('no response');
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
          console.log('cacheWhenFailed')

          return promise.then(value => {
            store.set(key, value)
            return value
          }).catch(err => {
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
