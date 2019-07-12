import { routerRedux } from 'dva/router';
import storage from '@/utils/storage';
import { PREGNANCY_ID } from '@/utils/constant';
import { query, update } from './service';

export default {
  namespace: 'pregnancy',

  state: {
    dataSource: {},
    selectedRow: {}
  },

  effects: {
    *query({ payload }, { call, put }) {
      const response = yield call(query, payload);
      // 保存孕册id
      storage.setItem(PREGNANCY_ID, payload[0]['id']);
      yield put({
        type: 'updateState',
        payload: {
          dataSource: response[0],
          pregnancyId: response[0]['id'],
        },
      });
    },
    *selectRow({ payload }, { call, put }) {
      // 保存孕册id
      storage.setItem(PREGNANCY_ID, payload.id);
      yield put({
        type: 'updateState',
        payload: {
          selectedRow: payload,
          pregnancyId: payload.id,
        },
      });
    },
    *update({ payload }, { call, put }) {
      const response = yield call(update, payload);
      // console.log('update response:', payload)
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    // updateValue(state, { payload }) {
    //   return {
    //     ...state,
    //     ...payload,
    //   }
    // },
    // updateRow(state, { payload }) {
    //   return {
    //     ...state,
    //     selectRow: payload,
    //   }
    // }
  },
}