import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { accountLogin, getFakeCaptcha } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import Storage from '@/utils/storage';
import { TOKEN } from '@/utils/constant';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    // 登陆操作，获取access token
    *login({ payload }, { call, put }) {
      // 返回结果只有{ id_token: '' }
      const response = yield call(accountLogin, payload);
      // const response = { id_token: 'token', currentAuthority: 'admin' };
      // 保存token
      const token = `Bearer ${response.id_token}`;
      Storage.setItem(TOKEN, token);
      // Login successfully
      if (response && response.id_token) {
        // 获取账户信息
        yield put({
          type: 'user/fetch'
        });
        yield put({
          type: 'changeLoginStatus',
          payload: {
            ...response,
            [TOKEN]: token,
            status: 'ok',
            currentAuthority: 'admin',
          },
        });

        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            redirect = null;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      Storage.removeItem(TOKEN);
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          [TOKEN]: '',
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      const { redirect } = getPageQuery();
      // redirect
      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        [TOKEN]: payload[TOKEN],
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
