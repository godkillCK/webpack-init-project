import _ from 'lodash';
import { updateAccountSafeInfo } from '../services/service';

export default {
  namespace: 'realnameOrganPwd',
  state: {
    pwdRequestAllList: [
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
    ],
    pwdRequest: ['0'],
    pwdRequest2List: [
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
    pwdAnswer: '',
    pwdAnswer2: '',
    password: '',
    messageVisible: false,
    message: '',
    updateAccountSafeInfoResponse: null,
  },
  reducers: {
    changePwdRequest(state, { payload }) {
      const { pwdRequest } = payload;
      const pwdRequestAllList = state.pwdRequestAllList;
      const pwdRequest2 = state.pwdRequest2;
      const pwdRequestList = _.toArray(_.omit(pwdRequestAllList, `${pwdRequest2[0]}`));
      const pwdRequest2List = _.toArray(_.omit(pwdRequestAllList, `${pwdRequest[0]}`));
      return { ...state, pwdRequest, pwdRequestList, pwdRequest2List };
    },
    changePwdRequest2(state, { payload }) {
      const { pwdRequest2 } = payload;
      const pwdRequestAllList = state.pwdRequestAllList;
      const pwdRequest = state.pwdRequest;
      const pwdRequestList = _.toArray(_.omit(pwdRequestAllList, `${pwdRequest2[0]}`));
      const pwdRequest2List = _.toArray(_.omit(pwdRequestAllList, `${pwdRequest[0]}`));
      return { ...state, pwdRequest2, pwdRequestList, pwdRequest2List };
    },
    onChangeState(state, { payload }) {
      const { fieldName, value } = payload;
      const newState = {};
      newState[fieldName] = value;
      return { ...state, ...newState };
    },
    showMessage(state, { payload }) {
      const { messageVisible, message } = payload;
      return { ...state, messageVisible, message };
    },
    setUpdateAccountSafeInfoResponse(state, { payload: data }) {
      if (data.data.errCode === 0) {
        window.location.href = './realname-organ-photo.html';
      }
      return { ...state, updateAccountSafeInfoResponse: data, messageVisible: !data.data.success, message: data.data.msg };
    },
  },
  effects: {
    *updateAccountSafeInfo({ payload: values }, { select, call, put }) {
      const realnameOrganPwdState = yield select(state => state.realnameOrganPwd);
      const param = _.pick(realnameOrganPwdState, ['password', 'pwdAnswer', 'pwdAnswer2']);
      param.pwdRequest = `${realnameOrganPwdState.pwdRequestAllList[realnameOrganPwdState.pwdRequest].label}？`;
      param.pwdRequest2 = `${realnameOrganPwdState.pwdRequestAllList[realnameOrganPwdState.pwdRequest2].label}？`;
      const { data } = yield call(updateAccountSafeInfo, JSON.stringify(param));
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
