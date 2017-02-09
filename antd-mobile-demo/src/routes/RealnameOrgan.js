import React from 'react';
import { connect } from 'dva/mobile';
import { NavBar, Picker, List } from 'antd-mobile';
import styles from './RealnameOrgan.css';

function RealnameOrgan({ dispatch, organTypeList, organType }) {
  const changeOrganType = (value) => {
    dispatch({
      type: 'realnameOrgan/changeOrganType',
      payload: value,
    });
  };
  return (
    <div>
      <NavBar
        onLeftClick={() => history.back()}
      >
        企业实名认证
      </NavBar>
      <Picker
        data={organTypeList}
        cols={1}
        value={organType}
        onChange={changeOrganType}
      >
        <List.Item arrow="horizontal">请选择单位类型</List.Item>
      </Picker>
    </div>
  );
}

function mapStateToProps(state) {
  const { organTypeList, organType } = state.realnameOrgan;
  return { organTypeList, organType };
}

export default connect(mapStateToProps)(RealnameOrgan);
