import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryConfig(id) {
  return request(`/api/yunchanshi/config?id=${id}`);
}
