import { routerRedux } from 'dva/router';
import { query, add, update, deleted } from '../services/user';

export default {
  namespace: 'userManagement',

  state: {
    dataSource: [],
    selectedRow: {}
  },

  effects: {
    *query(_, { call, put }) {
      const response = yield call(query);
      yield put({
        type: 'updateState',
        payload: {
          dataSource: response
        },
      });
    },
    *add({ payload }, { call, put }) {
      const response = yield call(add, payload);
      // 增加成功，返回完整的用户列表，并更新
      yield put({
        type: 'query',
      });
    },
    *update({ payload }, { call, put }) {
      const response = yield call(update, payload);
      // 更新成功，返回完整的用户列表，并更新
      yield put({
        type: 'query',
      });
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(deleted, payload);
      // 删除成功，返回完整的用户列表，并更新
      yield put({
        type: 'query',
      });
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    }
  },
}
