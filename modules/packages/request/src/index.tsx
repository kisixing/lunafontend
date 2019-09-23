import { Iconfig, RequestOptions } from './types';
import { message, notification } from 'antd';
import getErrData from './getErrData';
import Request from './Request';

class R extends Request {
  private hasConfiged = false;
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
}

const r = new R();
const { get, post, config } = r;
export { get, post, config };
export default r;
