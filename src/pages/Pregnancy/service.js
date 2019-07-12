import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 获取孕册初始数据
 * @param {string} id -就诊卡号
 * @returns
 */
export async function query(id) {
  return request(`/api/pregnancies?idNO.equals=${id}`);
}

/**
 * 更新孕册
 * @param {object} params params
 * @returns
 */
export async function update(params) {
  return request(`/api/pregnancies`, {
    method: 'put',
    data: params,
  });
}
