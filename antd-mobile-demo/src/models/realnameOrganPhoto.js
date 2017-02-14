// import { updateAccountSafeInfo } from '../services/service';

export default {
  namespace: 'realnameOrganPhoto',
  state: {
    credentials: [],
    type: '',
    messageVisible: false,
    message: '',
    updateAccountSafeInfoResponse: null,
  },
  reducers: {
    onFileChange(state, { payload }) {
      const { credentials, type } = payload;
      return { ...state, credentials, type };
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
  },
  subscriptions: {},
};
