import { Iconfig, RequestOptions } from './types';
// import { message, notification } from 'antd';
import getErrData from './getErrData';
import Request from './Request';
import store from "store";
import { formatDate, formatTime, TOKEN_KEY } from "@lianmed/utils";
import reasons from './reasons'
import C from "crypto-js/aes";
import { enc } from "crypto-js";
const notification = require('antd/lib/notification').default
const message = require('antd/lib/message').default
const { encrypt, decrypt } = C
const SEARCH_KEY = 0x21ac.toString()
class R extends Request {
  TOKEN_KEY = TOKEN_KEY
  private hasConfiged = false;
  configure: Iconfig = { Authorization: store.get(TOKEN_KEY) };
  responseInterceptrorUsed = false

  public config = (configs: Iconfig = {}): Request => {
    const { hasConfiged } = this;
    if (hasConfiged) {
      console.warn("couldn't config twice");
      // return this;
    }
    this.hasConfiged = true;
    let { Authorization = store.get(TOKEN_KEY) as string || '' } = configs;
    Authorization && (Authorization = Authorization.includes('Bearer') ? Authorization : `Bearer ${Authorization}`) && (store.set(TOKEN_KEY, Authorization))

    Object.assign(this.configure, configs, { Authorization });

    this.init(this.configure);
    // request拦截器, 改变url 或 options.
    this._request.interceptors.request.use((url, options) => {
      (options.headers as any).Authorization = Authorization || store.get(TOKEN_KEY)
      return { url, options };
    });
    if (!this.responseInterceptrorUsed) {
      this.responseInterceptrorUsed = true
      this._request.interceptors.response.use((response: Response, options: RequestOptions) => {
        const { successText, hideErr } = options;
        const errorData = getErrData(response);
        const { status, errortext, url, data } = errorData;

        if ([200, 201, 204, 304].includes(status)) {
          successText && message.success(successText);
        } else {
          const r = reasons[Math.floor(Math.random() * reasons.length)]
          data.then((d = { title: r }) => {
            const { title = r } = d
            //   notification.error({
            //     message: '未登录或登录已过期，请重新登录。',
            //   });
            // }
            if (!hideErr) {
              notification.error({
                // message: `请求错误 ${status}: ${url}`,
                message: `请求错误 ${errortext}`,
                description: `原因：${title}`,
              });
            } else {
              console.error('Network Error', `请求错误 ${status}: ${url}: ${errortext}`);
            }
          });
        }

        return response;
      });
    }

    return this;
  };
  authenticate = (params, c: Iconfig = {}) => {
    const options = {
      data: params,
      ...c
    }
    return this._request.post(`/authenticate`, options).then(r => {
      if (r && r.id_token) {
        let Authorization = r.id_token
        Authorization = Authorization.includes('Bearer') ? Authorization : `Bearer ${Authorization}`
        this.config({ Authorization, ...c })
        store.set(TOKEN_KEY, Authorization);

        return Authorization
      } else {
        throw '非标准登陆'
      }
    })
  }
  unAuthenticate = () => new Promise((res) => {
    store.remove(TOKEN_KEY)
    res()

  })
  configFromLocation = (url = location.href) => {
    const _ = new URL(url)
    const key = _.searchParams.get(SEARCH_KEY)
    let c
    if (key) {
      const jsonStr = decrypt(key, SEARCH_KEY).toString(enc.Utf8)
      c = JSON.parse(jsonStr)
      this.config(c)
    }
    return c as Iconfig
  }
  configToLocation(url = location.href, attachment: { [x: string]: any } & Iconfig = {}) {
    const c = Object.assign({}, this.configure, attachment)
    const enc = encrypt(JSON.stringify(c), SEARCH_KEY).toString()
    const _ = new URL(url)
    _.searchParams.append(SEARCH_KEY, enc)
    return _.href
  }
  fetchPage = <T extends {}>(model: string, data: { current?: number; pageSize?: number;[x: string]: any; }, keyMap: Record<string, string> = {}) => {
    const r = this._request
    const { current, pageSize, ...otherParams } = data
    // moment object to date/time
    const momentHandleKey = ['mtod_', 'mtot_']
    const momentHandleFn = [formatDate, formatTime]
    const params = {
      ...(Object.entries(otherParams).reduce((p, [k, v]) => {
        let momentHandleIdx = 0
        const isMonent = v && v._isAMomentObject && ((momentHandleIdx = momentHandleKey.findIndex(_ => k.startsWith(_))) > -1)
        k = isMonent ? k.slice(5) : k
        k = keyMap[k] || k
        v = (isMonent) ? momentHandleFn[momentHandleIdx](v) : v
        v = v === null ? undefined : v
        p[`${k}`] = v
        return p
      }, {})),
      page: (current - 1) || 0,
      size: pageSize
    }

    return Promise.all([
      r.get<T[]>(`/${model}page`, {
        params,
      }),
      r.get<number>(`/${model}/count`, {
        params,
      }).catch(() => 20)
    ]).then(arr => {
      return {
        data: arr[0],
        pagination: {
          total: arr[1],
          current,
          pageSize
        }
      }
    })
  }

}

const r = new R();
const { get, post, put, config, fetchPage, delete: del } = r;
export { get, post, put, del, config, fetchPage };
export default r;
