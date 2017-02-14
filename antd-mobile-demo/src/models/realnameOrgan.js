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
    // organType: ['0'],
    // legalArea: ['0'],
    // userType: 1,
    // licenseType: 0,
    messageVisible: false,
    message: '',
    updateAccountInfoResponse: null,
    accountInfo: null,
  },
  reducers: {
    changeOrganType(state, { payload }) {
      const { organType } = payload;
      const accountInfo = { ...state.accountInfo };
      accountInfo.data.organize.organType = organType[0];
      return { ...state, accountInfo };
    },
    changeLegalArea(state, { payload }) {
      const { legalArea } = payload;
      const accountInfo = { ...state.accountInfo };
      accountInfo.data.organize.legalArea = legalArea[0];
      return { ...state, accountInfo };
    },
    changeUserType(state, { payload }) {
      const { userType } = payload;
      const accountInfo = { ...state.accountInfo };
      accountInfo.data.organize.userType = userType;
      return { ...state, accountInfo };
    },
    changeLicenseType(state, { payload }) {
      const { licenseType } = payload;
      const accountInfo = { ...state.accountInfo };
      accountInfo.data.organize.licenseType = licenseType;
      return { ...state, accountInfo };
    },
    onChangeOrganizeField(state, { payload }) {
      const { fieldName, value } = payload;
      console.log('fieldName: ', fieldName);
      console.log('value: ', value);
      const accountInfo = { ...state.accountInfo };
      accountInfo.data.organize[fieldName] = value;
      console.log('newAccountInfo: ', accountInfo);
      return { ...state, accountInfo };
    },
    showMessage(state, { payload }) {
      const { messageVisible, message } = payload;
      return { ...state, messageVisible, message };
    },
    setAccountInfo(state, { payload: data }) {
      return { ...state, accountInfo: data.data };
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
      console.log('updateAccountInfo: ', data);
      yield put({
        type: 'setUpdateAccountInfoResponse',
        payload: {
          data,
        },
      });
    },
    *getAccountInfo({ payload }, { call, put }) {
      const { data } = yield call(getAccountInfo);
      console.log('getAccountInfo:', data);
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
      if (window.location.href.indexOf('realname-organ.html') > -1) {
        dispatch({
          type: 'getAccountInfo',
        });
      }
    },
  },
};
