import { stringify } from 'qs';
import request from '@/utils/request';

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'post',
    },
  });
}

/**
 * 账号密码登录login account
 * @param params { username, password, rememberMe }
 * @returns {Promise<void>}
 */
export async function accountLogin(params) {
  return request('/api/authenticate', {
    method: 'POST',
    data: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

/**
 * 获取验证手机
 * @param mobile
 * @returns {Promise<void>}
 */
export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
