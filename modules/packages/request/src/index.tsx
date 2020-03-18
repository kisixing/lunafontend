import { Iconfig, RequestOptions } from './types';
import { message, notification } from 'antd';
import getErrData from './getErrData';
import Request from './Request';
import store from "store";
import { TOKEN_KEY } from "@lianmed/utils";


class R extends Request {
  TOKEN_KEY = TOKEN_KEY
  private hasConfiged = false;
  configure: { [x: string]: any } = {};
  public config = (configs: Iconfig = {}): Request => {
    const { hasConfiged } = this;
    if (hasConfiged) {
      console.warn("couldn't config twice");
      // return this;
    }
    this.hasConfiged = true;
    const { Authorization = store.get(TOKEN_KEY) || '' } = configs;
    Object.assign(this.configure, configs, { Authorization });

    this.init(this.configure);
    // request拦截器, 改变url 或 options.
    this._request.interceptors.request.use((url, options) => {
      // eslint-disable-next-line no-param-reassign

      Authorization &&
        ((options.headers as any).Authorization =
          Authorization.indexOf('Bearer') < 0 ? `Bearer ${Authorization}` : Authorization);
      return { url, options };
    });

    this._request.interceptors.response.use((response: Response, options: RequestOptions) => {
      const { successText, hideErr } = options;
      const errorData = getErrData(response);
      const { status, errortext, url, data } = errorData;

      // eslint-disable-next-line no-param-reassign
      if ([200, 201, 204, 304].includes(status)) {
        successText && message.success(successText);
      } else {
        data.then(({ title = 'no title' } = { title: 'no title' }) => {
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
            console.error('Network Error', `请求错误 ${status}: ${url}: ${errortext}`);
          }
        });
      }

      return response;
    });
    return this;
  };
  authenticate = (params, c: Iconfig = {}) => {
    const options = {
      data: params,
      ...c
    }
    return this._request.post(`/authenticate`, options).then(r => {
      if (r && r.id_token) {
        const Authorization = r.id_token
        this.config({ Authorization, ...c })
        store.set(TOKEN_KEY, Authorization);

        return true
      } else {
        throw '非标准登陆'
      }
    })
  }
}

const r = new R();
const { get, post, put, config } = r;
export { get, post, put, config };
export default r;
