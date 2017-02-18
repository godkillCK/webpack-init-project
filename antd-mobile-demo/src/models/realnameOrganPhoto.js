import _ from 'lodash';
import { uploadFile, updateAccountInfo } from '../services/service';

export default {
  namespace: 'realnameOrganPhoto',
  state: {
    regPhotoFile: [],
    organPhotoFile: [],
    legalPhotoProFile: [],
    legalPhotoConFile: [],
    agentPhotoProFile: [],
    agentPhotoConFile: [],
    agentPhotoFile: [],
    proxyPhotoFile: [],
    messageVisible: false,
    message: '',
    updateAccountInfoResponse: null,
    regPhoto: '',
    organPhoto: '',
    legalPhotoPro: '',
    legalPhotoCon: '',
    agentPhotoPro: '',
    agentPhotoCon: '',
    agentPhoto: '',
    proxyPhoto: '',
  },
  reducers: {
    onFileChange(state, { payload }) {
      return { ...state, ...payload };
    },
    showMessage(state, { payload }) {
      const { messageVisible, message } = payload;
      return { ...state, messageVisible, message };
    },
    setPhotoUrl(state, { payload }) {
      const { photoType, url } = payload;
      const newState = {};
      newState[photoType] = url;
      return { ...state, ...newState };
    },
    setUpdateAccountInfoResponse(state, { payload: data }) {
      if (data.data.errCode === 0) {
        window.location.href = './realname-organ-result.html';
      }
      return { ...state, updateAccountInfoResponse: data, messageVisible: !data.data.success, message: data.data.msg };
    },
  },
  effects: {
    *uploadFile({ payload }, { call, put }) {
      const { photoType, files } = payload;
      const { data } = yield call(uploadFile, files[0].file);
      if (data.errCode === 0) {
        const newPayload = {};
        newPayload[`${photoType}File`] = files;
        yield put({
          type: 'onFileChange',
          payload: newPayload,
        });
        yield put({
          type: 'setPhotoUrl',
          payload: {
            photoType,
            url: data.data.ossKey,
          },
        });
      }
      yield put({
        type: 'showMessage',
        payload: {
          messageVisible: !data.success,
          message: data.msg,
        },
      });
    },
    *updateAccountInfo({ payload }, { select, call, put }) {
      const realnameOrganPhotoState = yield select(state => state.realnameOrganPhoto);
      const organize = _.pick(realnameOrganPhotoState, ['regPhoto', 'organPhoto', 'legalPhotoPro', 'legalPhotoCon', 'agentPhotoPro', 'agentPhotoCon', 'agentPhoto', 'proxyPhoto']);
      const param = { organize };
      const { data } = yield call(updateAccountInfo, JSON.stringify(param));
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
