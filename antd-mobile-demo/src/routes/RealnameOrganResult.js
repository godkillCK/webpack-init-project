import React from 'react';
import { connect } from 'dva/mobile';
import { Button, InputItem, Result, NavBar, ActivityIndicator } from 'antd-mobile';
// import { moment } from 'moment';
// import 'moment/locale/zh-cn';
import styles from './mixins.less';

// const Item = List.Item;
// const zhNow = moment().locale('zh-cn').utcOffset(8);

function RealnameOrganResult(props) {
  const { loading, dispatch, status, rejReason, message } = props;
  const showMessage = (m, e) => {
    // 现象：如果弹出的弹框上的 x 按钮的位置、和手指点击 button 时所在的位置「重叠」起来，
    // 会触发 x 按钮的点击事件而导致关闭弹框 (注：弹框上的取消/确定等按钮遇到同样情况也会如此)
    e.preventDefault(); // 修复 Android 上点击穿透
    dispatch({
      type: 'realnameOrganPwd/showMessage',
      payload: {
        messageVisible: true,
        message: m,
      },
    });
  };
  const onClose = () => {
    dispatch({
      type: 'realnameOrganPwd/showMessage',
      payload: {
        messageVisible: false,
        message,
      },
    });
  };
  const reAuth = () => {
    window.location.href = 'realname-organ.html';
  };
  const valiExtra = () => {
    return (
      111
    );
  };
  const onSubmit = (e) => {
    debugger;
  };
  let img;
  let title;
  let msg;
  switch (status) {
    case '2':
      img = 'https://zos.alipayobjects.com/rmsportal/gIGluyutXOpJmqx.png';
      title = '等待审核';
      msg = () => ('已提交，等待后台审核');
      break;
    case '3':
      img = 'https://zos.alipayobjects.com/rmsportal/LUIUWjyMDWctQTf.png';
      title = '审核失败';
      msg = () => {
        return (
          <div>
            <div style={{ marginBottom: '0.2rem' }}>{`失败原因：${rejReason}`}</div>
            <Button type="primary" onClick={reAuth} inline>重新认证</Button>
          </div>
        );
      };
      break;
    case '4':
      img = 'https://zos.alipayobjects.com/rmsportal/gIGluyutXOpJmqx.png';
      title = '等待打款';
      msg = () => ('等待打款');
      break;
    case '5':
      img = 'https://zos.alipayobjects.com/rmsportal/gIGluyutXOpJmqx.png';
      title = '打款金额验证';
      msg = () => {
        return (
          <div>
            <input type="text" />
          </div>
        );
      };
      break;
    case '9':
      img = 'https://zos.alipayobjects.com/rmsportal/hbTlcWTgMzkBEiU.png';
      title = '实名成功';
      msg = () => ('您现在可享有相关的服务');
      break;
    default:
      // img = 'https://zos.alipayobjects.com/rmsportal/NRzOqylcxEstLGf.png';
      // title = '未实名';
      // msg = () => {
      //   return (
      //     <div>
      //       请<a href="realname-organ.html" className={styles.jump_link}>点这里</a>完成实名认证
      //     </div>
      //   );
      // };
      img = 'https://zos.alipayobjects.com/rmsportal/gIGluyutXOpJmqx.png';
      title = '打款金额验证';
      msg = () => {
        return (
          <div>
            <InputItem
              placeholder="请输入"
              extra={valiExtra()}
              onExtraClick={onSubmit}
            />
          </div>
        );
      };
  }
  return (
    <div>
      <NavBar iconName={null}>
        企业实名认证
      </NavBar>
      <Result
        imgUrl={img}
        title={title}
        message={msg()}
      />

      {/* <ActivityIndicator
        toast
        color="white"
        size="large"
        animating={loading}
      /> */}
    </div>
  );
}

function mapStateToProps(state) {
  return { ...state.realnameOrganResult, loading: state.loading.global };
}

export default connect(mapStateToProps)(RealnameOrganResult);
