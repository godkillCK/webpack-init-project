import { updateAccountInfo } from '../services/service';

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
    organType: ['0'],
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
    legalArea: ['0'],
    userType: 1,
    showAgent: 'block',
    messageVisible: false,
    message: '',
    updateAccountInfoResponse: null,
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
      if (userType === 1) {
        return { ...state, userType, showAgent: 'block' };
      } else {
        return { ...state, userType, showAgent: 'none' };
      }
    },
    showMessage(state, { payload }) {
      const { messageVisible, message } = payload;
      return { ...state, messageVisible, message };
    },
    setUpdateAccountInfoResponse(state, { payload: data }) {
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
  },
  subscriptions: {},
};
