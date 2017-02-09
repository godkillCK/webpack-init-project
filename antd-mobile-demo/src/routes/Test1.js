import React from 'react';
import { connect } from 'dva/mobile';
import { List, InputItem, Switch, Stepper, Slider, Button, Modal } from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from './Test1.css';

const Item = List.Item;

function Test1({ dispatch, form, messageVisible, message }) {
  const showMessage = (m, e) => {
    // 现象：如果弹出的弹框上的 x 按钮的位置、和手指点击 button 时所在的位置「重叠」起来，
    // 会触发 x 按钮的点击事件而导致关闭弹框 (注：弹框上的取消/确定等按钮遇到同样情况也会如此)
    e.preventDefault(); // 修复 Android 上点击穿透
    dispatch({
      type: 'test1/showMessage',
      payload: {
        messageVisible: true,
        message: m,
      },
    });
  };
  const onClose = () => {
    dispatch({
      type: 'test1/showMessage',
      payload: {
        messageVisible: false,
        message,
      },
    });
  };
  const onSubmit = (e) => {
    form.validateFields({ force: true }, (error) => {
      if (!error) {
        showMessage(form.getFieldsValue(), e);
      } else {
        showMessage('校验失败', e);
      }
    });
  };
  const validateAccount = (rule, value, callback) => {
    if (value && value.length > 4) {
      callback();
    } else {
      callback(new Error('帐号至少4个字符'));
    }
  };
  const { getFieldProps, getFieldError } = form;
  return (
    <div>
      <form>
        <List
          renderHeader={() => '验证表单'}
          renderFooter={() => getFieldError('account') && getFieldError('account').join(',')}
        >
          <InputItem
            {...getFieldProps('account', {
              // initialValue: '小蚂蚁',
              rules: [
                { required: true, message: '请输入帐号' },
                { validator: validateAccount },
              ],
            })}
            clear
            error={!!getFieldError('account')}
            onErrorClick={(e) => {
              showMessage(getFieldError('account').join('、'), e);
            }}
            placeholder="请输入账号"
          >
            帐号
          </InputItem>
          <InputItem {...getFieldProps('password')} placeholder="请输入密码" type="password">
            密码
          </InputItem>
          <Item
            extra={<Switch {...getFieldProps('1', { initialValue: true, valuePropName: 'checked' })} />}
          >
            确认信息
          </Item>
          <Item><Slider range defaultValue={[20, 50]} /></Item>
          <Item extra={<Stepper style={{ width: '100%', minWidth: '2rem' }} showNumber size="small" defaultValue={20} />}>预定人数</Item>
        </List>
        <div style={{ margin: 12 }}>
          <Button type="primary" onClick={onSubmit} inline>提交验证</Button>
        </div>
      </form>

      <Modal
        title=""
        transparent
        maskClosable={false}
        visible={messageVisible}
        onClose={onClose}
        footer={[{ text: '确定', onPress: () => { onClose(); } }]}
      >
        {message}
      </Modal>
    </div>
  );
}

function mapStateToProps(state) {
  const { messageVisible, message } = state.test1;
  return { messageVisible, message };
}

export default connect(mapStateToProps)(createForm()(Test1));
