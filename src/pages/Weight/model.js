import { query } from './service';

export default {
  namespace: 'weight',

  state: {
    dataSource: [],
  },

  effects: {
    *query({ payload }, { call, put }) {
      const response = yield call(query, payload);
      console.log('weight model', response);

      yield put({
        type: 'updateState',
        payload: {
          dataSource: response,
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
