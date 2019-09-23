import { extend, RequestMethod } from 'umi-request';
import { Iconfig, RequestOptions } from './types';
import { message, notification } from 'antd';
import getErrData from './getErrData';

const intervalSet: Set<string> = new Set();

type RequestType = (url: string, options?: RequestOptions) => Promise<any>;
class R {
  private _request: RequestMethod = null;
  private hasConfiged = false;
  constructor() {
    this.init();
  }
  private init = (configs: Iconfig = {}) => {
    const { errHandler, ...others } = configs;
    this._request = extend({
      timeout: 5000,
      credentials: 'include', // 默认请求是否带上cookie
      headers: {
        Accept: 'application/json',
      },
      errorHandler: err => {
        const errorData = getErrData(err.response);
        errHandler && errHandler(errorData);

        return Promise.reject(errorData);
      },
      ...others,
    });
    this.intercept();
  };
  public config = (configs: Iconfig = {}) => {
    const { hasConfiged } = this;
    if (hasConfiged) {
      return console.warn("couldn't config twice");
    }
    this.hasConfiged = true;
    const { Authorization = '' } = configs;

    this.init(configs);
    // request拦截器, 改变url 或 options.
    this._request.interceptors.request.use((url, options) => {
      // eslint-disable-next-line no-param-reassign
      options.headers = {
        ...options.headers,
        Authorization,
      };
      return { url, options };
    });

    this._request.interceptors.response.use((response: Response, options: RequestOptions) => {
      const { successText, hideErr } = options;
      const { status } = response;

      // eslint-disable-next-line no-param-reassign
      if ([200, 304].includes(status)) {
        successText && message.success(successText);
      } else {
        if (status === 401) {
          notification.error({
            message: '未登录或登录已过期，请重新登录。',
          });
        }

        if (!hideErr) {
          const errorData = getErrData(response);
          const { status, errortext, url } = errorData;
          notification.error({
            message: `请求错误 ${status}: ${url}`,
            description: errortext,
          });
        }
      }

      return response;
    });
    return this._request;
  };

  private intercept() {
    ['get', 'post'].forEach(_ => {
      this[_] = ((url, options = {}) => {
        const { loading, interval } = options;
        if (typeof interval === 'number') {
          const key = _ + ':' + url;
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
        return promise;
      }) as RequestType;
    });
  }
  post: RequestType;
  get: RequestType;
}

const r = new R();
const { get, post, config } = r;
export { get, post, config };
export default r;
