import { getAccountInfo, updateAccountInfo } from '../services/service';

export default {
  namespace: 'realnameOrgan',
  state: {
    organTypeList: [
      {
        value: '0',
        label: '普通企业',
      },
      {
        value: '1',
        label: '社会团体',
      },
      {
        value: '2',
        label: '事业单位',
      },
      {
        value: '3',
        label: '民办非企业单位',
      },
      {
        value: '4',
        label: '党政及国家机关',
      },
    ],
    legalAreaList: [
      {
        value: '0',
        label: '中国大陆',
      },
      {
        value: '1',
        label: '香港',
      },
      {
        value: '2',
        label: '澳门',
      },
      {
        value: '3',
        label: '台湾',
      },
      {
        value: '4',
        label: '外籍',
      },
    ],
    organType: ['0'],
    legalArea: ['0'],
    userType: 1,
    cardType: 0,
    messageVisible: false,
    message: '',
    updateAccountInfoResponse: null,
    accountInfo: null,
  },
  reducers: {
    changeOrganType(state, { payload }) {
      const { organType } = payload;
      return { ...state, organType };
    },
    changeLegalArea(state, { payload }) {
      const { legalArea } = payload;
      return { ...state, legalArea };
    },
    changeUserType(state, { payload }) {
      const { userType } = payload;
      return { ...state, userType };
    },
    changeCardType(state, { payload }) {
      const { cardType } = payload;
      return { ...state, cardType };
    },
    showMessage(state, { payload }) {
      const { messageVisible, message } = payload;
      return { ...state, messageVisible, message };
    },
    setAccountInfo(state, { payload: data }) {
      return { ...state, accountInfo: data };
    },
    setUpdateAccountInfoResponse(state, { payload: data }) {
      if (data.data.errCode === 0) {
        window.location.href = './realname-organ-pwd.html';
      }
      return { ...state, updateAccountInfoResponse: data };
    },
  },
  effects: {
    *updateAccountInfo({ payload: values }, { call, put }) {
      const { data } = yield call(updateAccountInfo, values);
      console.log('data: ', data);
      yield put({
        type: 'setUpdateAccountInfoResponse',
        payload: {
          data,
        },
      });
    },
    *getAccountInfo({ payload }, { call, put }) {
      const { data } = yield call(getAccountInfo);
      console.log('data:', data);
      yield put({
        type: 'setAccountInfo',
        payload: {
          data,
        },
      });
    },
  },
  subscriptions: {
    init({ dispatch }) {
      debugger;
      if (window.location.href.indexOf('realname-organ.html') > -1) {
        dispatch({
          type: 'getAccountInfo',
        });
      }
    },
  },
};
