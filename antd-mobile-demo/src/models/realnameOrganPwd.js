import { updateAccountSafeInfo } from '../services/service';

export default {
  namespace: 'realnameOrganPwd',
  state: {
    pwdRequestList: [
      {
        value: '0',
        label: '我小学的校名',
      },
      {
        value: '1',
        label: '我的出生地',
      },
      {
        value: '2',
        label: '我老公的名字',
      },
      {
        value: '3',
        label: '我妻子的名字',
      },
      {
        value: '4',
        label: '我最喜欢的电影',
      },
      {
        value: '5',
        label: '我初中班主任的名字',
      },
      {
        value: '6',
        label: '我妈妈的名字',
      },
      {
        value: '7',
        label: '我爸爸的名字',
      },
    ],
    pwdRequest: ['0'],
    pwdRequest2List: [
      {
        value: '0',
        label: '我小学的校名',
      },
      {
        value: '1',
        label: '我的出生地',
      },
      {
        value: '2',
        label: '我老公的名字',
      },
      {
        value: '3',
        label: '我妻子的名字',
      },
      {
        value: '4',
        label: '我最喜欢的电影',
      },
      {
        value: '5',
        label: '我初中班主任的名字',
      },
      {
        value: '6',
        label: '我妈妈的名字',
      },
      {
        value: '7',
        label: '我爸爸的名字',
      },
    ],
    pwdRequest2: ['7'],
    messageVisible: false,
    message: '',
    updateAccountSafeInfoResponse: null,
  },
  reducers: {
    changePwdRequest(state, { payload }) {
      const { pwdRequest } = payload;
      return { ...state, pwdRequest };
    },
    changePwdRequest2(state, { payload }) {
      const { pwdRequest2 } = payload;
      return { ...state, pwdRequest2 };
    },
    showMessage(state, { payload }) {
      const { messageVisible, message } = payload;
      return { ...state, messageVisible, message };
    },
    setUpdateAccountSafeInfoResponse(state, { payload: data }) {
      return { ...state, updateAccountSafeInfoResponse: data };
    },
  },
  effects: {
    *updateAccountSafeInfo({ payload: values }, { call, put }) {
      const { data } = yield call(updateAccountSafeInfo, values);
      console.log('data: ', data);
      yield put({
        type: 'setUpdateAccountSafeInfoResponse',
        payload: {
          data,
        },
      });
    },
  },
  subscriptions: {},
};
