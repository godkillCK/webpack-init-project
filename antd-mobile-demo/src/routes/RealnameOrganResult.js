import React from 'react';
import { connect } from 'dva/mobile';
import { Button, InputItem, Result, NavBar, Modal, ActivityIndicator } from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from './mixins.less';

function RealnameOrganResult(props) {
  const { loading, dispatch, status, form, rejReason, messageVisible, message } = props;
  const showMessage = (m, e) => {
    e.preventDefault();
    dispatch({
      type: 'realnameOrganResult/showMessage',
      payload: {
        messageVisible: true,
        message: m,
      },
    });
  };
  const onClose = () => {
    dispatch({
      type: 'realnameOrganResult/showMessage',
      payload: {
        messageVisible: false,
        message,
      },
    });
  };
  const onChangePrice = (value) => {
    dispatch({
      type: 'realnameOrganResult/setPrice',
      payload: {
        price: value,
      },
    });
  };
  const { getFieldProps, getFieldError } = form;
  const reAuth = () => {
    window.location.href = 'realname-organ.html';
  };
  const valiExtra = () => {
    return (
      <Button type="primary" size="small" inline>确认</Button>
    );
  };
  const onSubmit = (e) => {
    form.validateFields({ force: true }, (error) => {
      if (error) {
        showMessage('校验失败', e);
      } else {
        dispatch({
          type: 'realnameOrganResult/checkPrice',
        });
      }
    });
  };
  let img;
  let title;
  let msg;
  switch (status !== null ? status.toString() : status) {
    case '2':
      img = 'https://zos.alipayobjects.com/rmsportal/gIGluyutXOpJmqx.png';
      title = '等待审核';
      msg = () => {
        return (
          <div>
            已提交，等待后台审核 <a href="../home.html" className={styles.jump_link}>返回首页</a>
          </div>
        );
      };
      break;
    case '3':
      img = 'https://zos.alipayobjects.com/rmsportal/LUIUWjyMDWctQTf.png';
      title = '审核失败';
      msg = () => {
        return (
          <div>
            <div style={{ marginBottom: '0.2rem' }}>{`失败原因：${rejReason}`}</div>
            <Button type="primary" onClick={reAuth} size="small" inline>重新认证</Button>
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
            <form>
              <InputItem
                className="my-input-extra"
                placeholder="请输入对公银行账户收到的金额"
                extra={valiExtra()}
                onExtraClick={onSubmit}
                {...getFieldProps('checkPrice', {
                  onChange(value) {
                    onChangePrice(value);
                  },
                  rules: [
                    { required: true, message: '请输入验证金额' },
                  ],
                })}
                clear
                error={!!getFieldError('checkPrice')}
                onErrorClick={(e) => {
                  showMessage(getFieldError('checkPrice').join('、'), e);
                }}
              />
            </form>
          </div>
        );
      };
      break;
    case '9':
      img = 'https://zos.alipayobjects.com/rmsportal/hbTlcWTgMzkBEiU.png';
      title = '实名成功';
      msg = () => {
        return (
          <div>
            您现在可享有相关的服务 <a href="../home.html" className={styles.jump_link}>返回首页</a>
          </div>
        );
      };
      break;
    default:
      img = 'https://zos.alipayobjects.com/rmsportal/NRzOqylcxEstLGf.png';
      title = '未实名';
      msg = () => {
        return (
          <div>
            请<a href="realname-organ.html" className={styles.jump_link}>点这里</a>完成实名认证
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

      <Modal
        title=""
        transparent
        maskClosable={false}
        visible={messageVisible}
        closable={false}
        onClose={onClose}
        footer={[{ text: '确定', onPress: () => { onClose(); } }]}
      >
        {message}
      </Modal>

      <ActivityIndicator
        toast
        color="white"
        size="large"
        animating={loading}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return { ...state.realnameOrganResult, loading: state.loading.global };
}

export default connect(mapStateToProps)(createForm()(RealnameOrganResult));
