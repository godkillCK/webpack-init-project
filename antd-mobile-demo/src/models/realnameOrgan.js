
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
  },
  reducers: {
    changeOrganType(state, { payload: organType }) {
      return { ...state, organType };
    },
  },
  effects: {},
  subscriptions: {},
};
