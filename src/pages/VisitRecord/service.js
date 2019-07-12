import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 获取数据列表
 * @param {string} id 孕册id
 * @param {string} type 记录类型
 * @returns
 */
export async function query({ id, type }) {
  return request(`/api/prenatal-visits?pregnancyId.equals=${id}&visitType.equals=${type}`);
}
