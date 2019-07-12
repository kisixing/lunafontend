import request from '@/utils/request';

/**
 * 获取数据列表
 * @param {string} id 孕册id
 * @returns
 */
export async function query(id) {
  return request(`/api/weight?pregnancyId=${id}`);
}
