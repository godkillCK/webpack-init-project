
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
    messageVisible: false,
    message: '',
  },
  reducers: {
    changeOrganType(state, { payload }) {
      const { organType } = payload;
      return { ...state, organType };
    },
    showMessage(state, { payload }) {
      const { messageVisible, message } = payload;
      return { ...state, messageVisible, message };
    },
  },
  effects: {},
  subscriptions: {},
};
