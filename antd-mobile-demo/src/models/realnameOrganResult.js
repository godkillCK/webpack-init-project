import { getAccountInfo } from '../services/service';

export default {
  namespace: 'realnameOrganResult',
  state: {
    messageVisible: false,
    message: '',
    status: null,
    rejReason: '',
  },
  reducers: {
    showMessage(state, { payload }) {
      const { messageVisible, message } = payload;
      return { ...state, messageVisible, message };
    },
    setStatus(state, { payload: status, payload: rejReason }) {
      return { ...state, status, rejReason };
    },
  },
  effects: {
    *getAccountInfo({ payload }, { call, put }) {
      const { data } = yield call(getAccountInfo);
      console.log(data.data.status);
      console.log(data.data.rejReason);
      yield put({
        type: 'setStatus',
        payload: {
          status: data.data.status,
          rejReason: data.data.rejReason,
        },
      });
    },
  },
  subscriptions: {
    init({ dispatch }) {
      if (window.location.href.indexOf('realname-organ-result.html') > -1) {
        dispatch({
          type: 'getAccountInfo',
        });
      }
    },
  },
};
