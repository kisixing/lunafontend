import request from '@/utils/request';

/**
 * 获取登陆用户基本信息
 * @returns {Promise<void>}
 */
export async function queryAccount() {
  return request('/api/account');
}

/**
 * 当前患者基本信息
 * @param params
 * @returns {Promise<void>}
 */
export async function queryCurrent(params) {
  return request('/api/pregnancie', {
    params,
  });
}
