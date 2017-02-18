import { getAccountInfo, checkPrice } from '../services/service';
import { isEmptyObj, getParam } from '../utils/commonutil';

export default {
  namespace: 'realnameOrganResult',
  state: {
    price: '',
    messageVisible: false,
    message: '',
    status: null,
    rejReason: '',
    checkPriceResponse: '',
  },
  reducers: {
    showMessage(state, { payload }) {
      const { messageVisible, message } = payload;
      return { ...state, messageVisible, message };
    },
    setStatus(state, { payload }) {
      const { status, rejReason } = payload;
      return { ...state, status, rejReason };
    },
    setPrice(state, { payload }) {
      const { price } = payload;
      return { ...state, price };
    },
    setCheckPriceResponse(state, { payload: data }) {
      if (data.data.errCode === 0) {
        return { ...state, checkPriceResponse: data, status: 9, messageVisible: !data.data.success, message: data.data.msg };
      }
      return { ...state, checkPriceResponse: data, messageVisible: !data.data.success, message: data.data.msg };
    },
  },
  effects: {
    *getAccountInfo({ payload }, { call, put }) {
      const { data } = yield call(getAccountInfo);
      yield put({
        type: 'setStatus',
        payload: {
          status: data.data.status,
          rejReason: data.data.rejReason,
        },
      });
    },
    *checkPrice({ payload }, { select, call, put }) {
      const price = yield select(state => state.realnameOrganResult.price);
      const { data } = yield call(checkPrice, JSON.stringify({ price }));
      yield put({
        type: 'setCheckPriceResponse',
        payload: {
          data,
        },
      });
    },
  },
  subscriptions: {
    init({ dispatch }) {
      if (window.location.href.indexOf('realname-organ-result.html') > -1) {
        const param = getParam(window.location.href);
        const { status, rejReason } = param;
        if (!isEmptyObj(status)) {
          dispatch({
            type: 'setStatus',
            payload: {
              status,
              rejReason,
            },
          });
        } else {
          dispatch({
            type: 'getAccountInfo',
          });
        }
      }
    },
  },
};
