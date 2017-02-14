import React from 'react';
import { connect } from 'dva/mobile';
import { NavBar, List, Button, Modal, ActivityIndicator, ImagePicker, Flex } from 'antd-mobile';
import { createForm } from 'rc-form';
// import { moment } from 'moment';
// import 'moment/locale/zh-cn';
import styles from './mixins.less';

// const Item = List.Item;
// const zhNow = moment().locale('zh-cn').utcOffset(8);

function RealnameOrganPhoto(props) {
  const { loading, dispatch, credentials, form, messageVisible, message } = props;
  const showMessage = (m, e) => {
    // 现象：如果弹出的弹框上的 x 按钮的位置、和手指点击 button 时所在的位置「重叠」起来，
    // 会触发 x 按钮的点击事件而导致关闭弹框 (注：弹框上的取消/确定等按钮遇到同样情况也会如此)
    e.preventDefault(); // 修复 Android 上点击穿透
    dispatch({
      type: 'realnameOrganPhoto/showMessage',
      payload: {
        messageVisible: true,
        message: m,
      },
    });
  };
  const onClose = () => {
    dispatch({
      type: 'realnameOrganPhoto/showMessage',
      payload: {
        messageVisible: false,
        message,
      },
    });
  };
  const onSubmit = (e) => {
    dispatch({
      type: 'realnameOrganPhoto/updateAccountSafeInfo',
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
  // const { getFieldProps, getFieldError } = form;
  const onFileChange = (files, type, index) => {
    console.log(files, type, index);
    dispatch({
      type: 'realnameOrganPhoto/onFileChange',
      payload: {
        credentials: files,
        type,
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
          renderHeader={() => '企业法人营业执照'}
        >
          <Flex
            className="my-flexbox-item-column"
          >
            <Flex.Item>
              <ImagePicker
                className="my-image-picker"
                files={credentials}
                onChange={onFileChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={credentials.length < 1}
              />
            </Flex.Item>
            <Flex.Item
              className="my-flexbox-item"
            >
              <div style={{ textAlign: 'center', paddingRight: '60px', marginBottom: '0.12rem' }}>营业执照</div>
            </Flex.Item>
          </Flex>
        </List>
        <List
          className="my-am-list"
          renderHeader={() => '法定代表人的证件照片'}
          // renderFooter={() => getFieldError('name') && getFieldError('name').join(',')}
        >
          <Flex>
            <Flex.Item>
              <Flex.Item>
                <ImagePicker
                  className="my-image-picker"
                  files={credentials}
                  onChange={onFileChange}
                  onImageClick={(index, fs) => console.log(index, fs)}
                  selectable={credentials.length < 1}
                />
              </Flex.Item>
              <Flex.Item
                className="my-flexbox-item"
              >
                <div style={{ textAlign: 'center', paddingRight: '60px', marginBottom: '0.12rem' }}>身份正正面照</div>
              </Flex.Item>
            </Flex.Item>
            <Flex.Item>
              <Flex.Item>
                <ImagePicker
                  className="my-image-picker"
                  files={credentials}
                  onChange={onFileChange}
                  onImageClick={(index, fs) => console.log(index, fs)}
                  selectable={credentials.length < 1}
                />
              </Flex.Item>
              <Flex.Item
                className="my-flexbox-item"
              >
                <div style={{ textAlign: 'center', paddingRight: '60px', marginBottom: '0.12rem' }}>身份正反面照</div>
              </Flex.Item>
            </Flex.Item>
          </Flex>
        </List>
<<<<<<< HEAD
        <Button className="btn" style={{ marginTop: 30, position: 'fixed', bottom: 0 }} type="primary" onClick={onSubmit}>确认</Button>
=======
        <Button className="btn my-bottom-btn" type="primary" onClick={onSubmit}>确认</Button>
>>>>>>> cc77f8d00c0fd02bc94a69c8a53c440cd911906b
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
  return { ...state.realnameOrganPhoto, loading: state.loading.global };
}

export default connect(mapStateToProps)(createForm()(RealnameOrganPhoto));
