// import { updateAccountSafeInfo } from '../services/service';

export default {
  namespace: 'realnameOrganPhoto',
  state: {
    credentials: [],
    messageVisible: false,
    message: '',
    updateAccountSafeInfoResponse: null,
  },
  reducers: {
    onFileChange(state, { payload }) {
      const { credentials } = payload;
      return { ...state, credentials };
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
