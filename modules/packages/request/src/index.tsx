import { Iconfig, RequestOptions } from './types';
import { message, notification } from 'antd';
import getErrData from './getErrData';
import Request from './Request';

class R extends Request {
  private hasConfiged = false;
  configure: { [x: string]: any } = {}
  public config = (configs: Iconfig = {}): Request => {


    const { hasConfiged } = this;
    if (hasConfiged) {
      console.warn("couldn't config twice");
      // return this;
    }
    this.hasConfiged = true;
    Object.assign(this.configure, configs)
    const { Authorization = '' } = configs;

    this.init(configs);
    // request拦截器, 改变url 或 options.
    this._request.interceptors.request.use((url, options) => {
      // eslint-disable-next-line no-param-reassign

      Authorization && ((options.headers as any).Authorization = Authorization.indexOf('Bearer') < 0 ? `Bearer ${Authorization}` : Authorization)
      return { url, options };
    });

    this._request.interceptors.response.use((response: Response, options: RequestOptions) => {
      const { successText, hideErr } = options;
      const errorData = getErrData(response);
      const { status, errortext, url, data } = errorData;

      // eslint-disable-next-line no-param-reassign
      if ([200, 201, 304].includes(status)) {
        successText && message.success(successText);
      } else {
        data.then(({ title }) => {
          if (status === 401) {
            notification.error({
              message: '未登录或登录已过期，请重新登录。',
            });
          }
          if (!hideErr) {
            notification.error({
              message: `请求错误 ${status}: ${url}`,
              description: `原因：${title}`,
            });
          } else {
            console.error('Network Error', `请求错误 ${status}: ${url}: ${errortext}`)
          }
        })
      }

      return response;
    });
    return this;
  };
}

const r = new R();
const { get, post, put, config } = r;
export { get, post, put, config };
export default r;
