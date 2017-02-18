import React from 'react';
import md5 from 'md5';
import { connect } from 'dva/mobile';
import { NavBar, Picker, List, InputItem, Button, Modal, ActivityIndicator } from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from './mixins.less';

function RealnameOrganPwd(props) {
  const { loading, dispatch, pwdRequestList, pwdRequest, pwdRequest2List, pwdRequest2, form, messageVisible, message } = props;
  const showMessage = (m, e) => {
    e.preventDefault();
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
  const onSubmit = (e) => {
    form.validateFields({ force: true }, (error) => {
      if (error) {
        showMessage('校验失败', e);
      } else {
        dispatch({
          type: 'realnameOrganPwd/updateAccountSafeInfo',
        });
      }
    });
  };
  const { getFieldProps, getFieldError } = form;
  const changePwdRequest = (value) => {
    dispatch({
      type: 'realnameOrganPwd/changePwdRequest',
      payload: {
        pwdRequest: value,
      },
    });
  };
  const changePwdRequest2 = (value) => {
    dispatch({
      type: 'realnameOrganPwd/changePwdRequest2',
      payload: {
        pwdRequest2: value,
      },
    });
  };
  const onChangeState = (fieldName, value) => {
    dispatch({
      type: 'realnameOrganPwd/onChangeState',
      payload: {
        fieldName,
        value,
      },
    });
  };
  const checkConfirm = (rule, value, callback) => {
    if (value) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  const checkPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码不一致');
    } else {
      callback();
    }
  };
  return (
    <div>
      <NavBar
        onLeftClick={() => history.back()}
      >
        企业实名认证
      </NavBar>

      <form>
        <List
          renderHeader={() => '签署密码'}
        >
          <InputItem
            labelNumber={5}
            type="password"
            {...getFieldProps('password', {
              onChange(value) {
                onChangeState('password', md5(value));
              },
              rules: [
                { required: true, message: '请输入签署密码' },
                { min: 6, message: '需6至15位的任意字符' },
                { max: 15, message: '需6至15位的任意字符' },
                { validator: checkConfirm },
              ],
            })}
            clear
            error={!!getFieldError('password')}
            onErrorClick={(e) => {
              showMessage(getFieldError('password').join('、'), e);
            }}
            placeholder=""
          >
            签署密码
          </InputItem>
          <InputItem
            labelNumber={5}
            type="password"
            {...getFieldProps('confirm', {
              rules: [
                { required: true, message: '请输入确认密码' },
                { min: 6, message: '需6至15位的任意字符' },
                { max: 15, message: '需6至15位的任意字符' },
                { validator: checkPassword },
              ],
            })}
            clear
            error={!!getFieldError('confirm')}
            onErrorClick={(e) => {
              showMessage(getFieldError('confirm').join('、'), e);
            }}
            placeholder=""
          >
            确认密码
          </InputItem>
        </List>
        <List
          style={{ marginBottom: '1rem' }}
          renderHeader={() => '安全保护问题'}
          // renderFooter={() => getFieldError('name') && getFieldError('name').join(',')}
        >
          <Picker
            data={pwdRequestList}
            cols={1}
            value={pwdRequest}
            onChange={changePwdRequest}
          >
            <List.Item arrow="horizontal">安全问题一</List.Item>
          </Picker>
          <InputItem
            labelNumber={5}
            {...getFieldProps('pwdAnswer', {
              onChange(value) {
                onChangeState('pwdAnswer', value);
              },
              rules: [
                { required: true, message: '请输入答案' },
              ],
            })}
            clear
            error={!!getFieldError('pwdAnswer')}
            onErrorClick={(e) => {
              showMessage(getFieldError('pwdAnswer').join('、'), e);
            }}
            placeholder=""
          >
            答案
          </InputItem>
          <Picker
            data={pwdRequest2List}
            cols={1}
            value={pwdRequest2}
            onChange={changePwdRequest2}
          >
            <List.Item arrow="horizontal">安全问题二</List.Item>
          </Picker>
          <InputItem
            labelNumber={5}
            {...getFieldProps('pwdAnswer2', {
              onChange(value) {
                onChangeState('pwdAnswer2', value);
              },
              rules: [
                { required: true, message: '请输入答案' },
              ],
            })}
            clear
            error={!!getFieldError('pwdAnswer2')}
            onErrorClick={(e) => {
              showMessage(getFieldError('pwdAnswer2').join('、'), e);
            }}
            placeholder=""
          >
            答案
          </InputItem>
        </List>
        <Button className="btn my-bottom-btn" type="primary" onClick={onSubmit}>下一步</Button>
      </form>

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
  return { ...state.realnameOrganPwd, loading: state.loading.global };
}

export default connect(mapStateToProps)(createForm()(RealnameOrganPwd));
