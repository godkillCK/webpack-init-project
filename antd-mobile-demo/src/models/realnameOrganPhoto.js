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
    messageVisible: false,
    message: '',
    updateAccountInfoResponse: null,
    regPhoto: '',
    organPhoto: '',
    legalPhotoPro: '',
    legalPhotoCon: '',
    agentPhotoPro: '',
    agentPhotoCon: '',
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
      return { ...state, updateAccountInfoResponse: data };
    },
  },
  effects: {
    *uploadFile({ payload }, { call, put }) {
      const { photoType, files } = payload;
      const { data } = yield call(uploadFile, files[0].file);
      console.log('uploadFile response: ', data);
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
    },
    *updateAccountInfo({ payload }, { select, call, put }) {
      const realnameOrganPhotoState = yield select(state => state.realnameOrganPhoto);
      const organize = _.pick(realnameOrganPhotoState, ['regPhoto', 'organPhoto', 'legalPhotoPro', 'legalPhotoCon', 'agentPhotoPro', 'agentPhotoCon']);
      const param = { organize };
      console.log(JSON.stringify(param));
      const { data } = yield call(updateAccountInfo, JSON.stringify(param));
      console.log('updateAccountInfo response: ', data);
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
