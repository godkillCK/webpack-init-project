import React from 'react';
import { connect } from 'dva/mobile';
import { NavBar } from 'antd-mobile';
import styles from './Test.css';

function Test() {
  return (
    <div>
      <NavBar
        onLeftClick={() => history.back()}
      >
        企业实名认证
      </NavBar>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Test);