
export default {
  namespace: 'test1',
  state: {
    messageVisible: false,
    message: '',
  },
  reducers: {
    showMessage(state, { payload }) {
      const { messageVisible, message } = payload;
      return { ...state, messageVisible, message };
    },
  },
  effects: {},
  subscriptions: {},
};
