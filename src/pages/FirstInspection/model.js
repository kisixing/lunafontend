import { routerRedux } from 'dva/router';
import { queryConfig } from './service';

export default {
  namespace: 'firstInspection',

  state: {
    dataSource: {}
  },

  effects: {
    *query({ payload }, { call, put }) {
      const response = yield call(queryConfig, payload);
      yield put({
        type: 'saveConfig',
        payload: response,
      });
    },
  },

  reducers: {
    saveConfig(state, { payload }) {
      return {
        ...state,
        config: payload,
      }
    }
  },

  subscriptions: {
    setupHistory({ dispatch, history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname }) => {
        if (pathname === '/first-check') {
          dispatch({
            type: 'queryConfig',
            payload: '123456'
          })
        }
      });
    },
  }
}
