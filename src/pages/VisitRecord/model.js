import { routerRedux } from 'dva/router';
import { query } from './service';

export default {
  namespace: 'visitRecord',

  state: {
    lists: [],
  },

  effects: {
    *query({ payload }, { call, put }) {
      const response = yield call(query, payload);
      console.log('prenatal-visits', response);

      yield put({
        type: 'updateState',
        payload: {
          lists: response,
        },
      });
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}