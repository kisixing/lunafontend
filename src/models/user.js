import { queryAccount, queryCurrent } from '@/services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentPatient: {},
    account: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      // 获取当前登录用户信息
      const response = yield call(queryAccount);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      // 获取当前患者基本信息
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentPatient',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        account: {
          ...payload,
          unreadCount: payload.unreadCount || '12',
          name: payload.lastName,
          avatar: payload.imageUrl,
        }
      };
    },
    saveCurrentPatient(state, action) {
      return {
        ...state,
        currentPatient: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
