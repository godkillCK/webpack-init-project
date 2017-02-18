import _ from 'lodash';
import { getAccountInfo, updateAccountInfo } from '../services/service';
import { isEmptyObj } from '../utils/commonutil';
import district from '../models/district';

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
      const accountInfo = { ...state.accountInfo };
      const oldAddress = isEmptyObj(accountInfo.data.organize.address) ? '' : accountInfo.data.organize.address;
      if (fieldName === 'address') {
        let address = '';
        for (const i in district) {
          if (district[i].value === value[0]) {
            address = `中国-${district[i].label}-${oldAddress.split('-')[2]}-${oldAddress.split('-')[3] === undefined || oldAddress.split('-')[3] == null ? '' : oldAddress.split('-')[3]}`;
            for (const j in district[i].children) {
              if (district[i].children[j].value === value[1]) {
                address = `中国-${address.split('-')[1]}-${district[i].children[j].label}-${address.split('-')[3]}`;
              }
            }
          }
        }
        accountInfo.data.organize.address = address;
      } else if (fieldName === 'address1') {
        accountInfo.data.organize.address = `中国-${oldAddress.split('-')[1]}-${oldAddress.split('-')[2]}-${value}`;
      } else {
        accountInfo.data.organize[fieldName] = value;
      }
      return { ...state, accountInfo };
    },
    onChangeBankField(state, { payload }) {
      const { fieldName, value } = payload;
      const accountInfo = { ...state.accountInfo };
      const oldBank = isEmptyObj(accountInfo.data.bank) ? '' : accountInfo.data.bank;
      if (fieldName === 'bankName') {
        accountInfo.data.bank = `${value}-${oldBank.split('-')[1] === undefined || oldBank.split('-')[1] == null ? '' : oldBank.split('-')[1]}`;
      } else if (fieldName === 'bankSubName') {
        accountInfo.data.bank = `${oldBank.split('-')[0]}-${value}`;
      }
      accountInfo.data[fieldName] = value;
      return { ...state, accountInfo };
    },
    showMessage(state, { payload }) {
      const { messageVisible, message } = payload;
      return { ...state, messageVisible, message };
    },
    setAccountInfo(state, { payload: data }) {
      if (isEmptyObj(data)) {
        data = {};
      }
      if (isEmptyObj(data.data)) {
        data.data = {};
      }
      if (isEmptyObj(data.data.data)) {
        data.data.data = {};
      }
      if (isEmptyObj(data.data.data.organize)) {
        data.data.data.organize = {};
      }
      if (data.data.errCode === 0 && data.data.data.status !== 1 && data.data.data.status !== 3) {
        window.location.href = `./realname-organ-result.html?status=${data.data.data.status}&rejReason=${data.data.data.rejReason}`;
      }
      return { ...state, accountInfo: data.data };
    },
    setUpdateAccountInfoResponse(state, { payload: data }) {
      if (data.data.errCode === 0) {
        window.location.href = './realname-organ-pwd.html';
      }
      return { ...state, updateAccountInfoResponse: data, messageVisible: !data.data.success, message: data.data.msg };
    },
  },
  effects: {
    *updateAccountInfo({ payload }, { select, call, put }) {
      const accountInfo = yield select(state => state.realnameOrgan.accountInfo);
      const param = _.pick(accountInfo.data, ['bank', 'bankNum', 'organize.name', 'organize.userType', 'organize.regCode', 'organize.organType',
        'organize.organEndTime', 'organize.organCode', 'organize.legalArea', 'organize.legalName', 'organize.legalIdNo', 'organize.licenseType', 'organize.address', 'organize.agentName',
        'organize.agentIdNo', 'organize.agentEndTime']);
      const { data } = yield call(updateAccountInfo, JSON.stringify(param));
      yield put({
        type: 'setUpdateAccountInfoResponse',
        payload: {
          data,
        },
      });
    },
    *getAccountInfo({ payload }, { call, put }) {
      const { data } = yield call(getAccountInfo);
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
      if (window.location.href.indexOf('realname-organ.html') > -1 || window.location.href.indexOf('realname-organ-pwd.html') > -1 || window.location.href.indexOf('realname-organ-photo.html') > -1) {
        dispatch({
          type: 'getAccountInfo',
        });
      }
    },
  },
};
