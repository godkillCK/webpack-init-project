import React from 'react';
import { connect } from 'dva/mobile';
import { NavBar, Picker, List, InputItem, Button, Modal, ActivityIndicator } from 'antd-mobile';
import { createForm } from 'rc-form';
// import { moment } from 'moment';
// import 'moment/locale/zh-cn';
import styles from './mixins.less';

// const Item = List.Item;
// const zhNow = moment().locale('zh-cn').utcOffset(8);

function RealnameOrganPwd(props) {
  const { loading, dispatch, pwdRequestList, pwdRequest, pwdRequest2List, pwdRequest2, form, messageVisible, message } = props;
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
  const onSubmit = (e) => {
    dispatch({
      type: 'realnameOrganPwd/updateAccountSafeInfo',
      payload: '{"password":"96e79218965eb72c92a549dd5a330112","pwdAnswer":"111","pwdAnswer2":"111","pwdRequest":"我爸爸的名字？","pwdRequest2":"我妈妈的名字？"}',
    });
    // form.validateFields({ force: true }, (error) => {
    //   if (error) {
    //     showMessage('校验失败', e);
    //   } else {
    //     dispatch({
    //       type: 'realnameOrgan/updateAccountInfo',
    //       payload: '{"bankNum":"123456","bank":"test-test","organize":{"name":"test21","userType":"2","regCode":"","organType":"0","organEndTime":"0","organCode":"913301087458306077","legalArea":"0","legalName":"陈凯","legalIdNo":"430181199002040335","licenseType":"1","address":"中国-北京市-北京市-test11"}}',
    //     });
    //   }
    // });
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
            {...getFieldProps('signPwd', {
              rules: [],
            })}
            clear
            error={!!getFieldError('signPwd')}
            onErrorClick={(e) => {
              showMessage(getFieldError('signPwd').join('、'), e);
            }}
            placeholder=""
          >
            签署密码
          </InputItem>
          <InputItem
            labelNumber={5}
            {...getFieldProps('signPwdConfirm', {
              rules: [],
            })}
            clear
            error={!!getFieldError('signPwdConfirm')}
            onErrorClick={(e) => {
              showMessage(getFieldError('signPwdConfirm').join('、'), e);
            }}
            placeholder=""
          >
            确认密码
          </InputItem>
        </List>
        <List
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
              rules: [],
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
              rules: [],
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
