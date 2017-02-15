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
  const { loading, dispatch, regPhotoFile, legalPhotoProFile, legalPhotoConFile, form, messageVisible, message } = props;
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
    form.validateFields({ force: true }, (error) => {
      if (error) {
        showMessage('校验失败', e);
      } else {
        dispatch({
          type: 'realnameOrganPhoto/updateAccountInfo',
        });
      }
    });
  };
  // const { getFieldProps, getFieldError } = form;
  const onFileChange = (files, type, index, photoType) => {
    if (type === 'add') {
      dispatch({
        type: 'realnameOrganPhoto/uploadFile',
        payload: {
          photoType,
          files,
        },
      });
    } else {
      const payload = {};
      payload[`${photoType}File`] = files;
      dispatch({
        type: 'realnameOrganPhoto/onFileChange',
        payload,
      });
      dispatch({
        type: 'realnameOrganPhoto/setPhotoUrl',
        payload: {
          photoType,
          url: '',
        },
      });
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
          renderHeader={() => '企业法人营业执照'}
        >
          <Flex
            className="my-flexbox-item-column"
          >
            <Flex.Item>
              <ImagePicker
                className="my-image-picker-organtype0"
                files={regPhotoFile}
                onChange={(files, type, index) => { onFileChange(files, type, index, 'regPhoto'); }}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={regPhotoFile.length < 1}
              />
            </Flex.Item>
            <Flex.Item
              className="my-flexbox-item"
            >
              <div className={styles.img_title}>营业执照</div>
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
                  className="my-image-picker-idPro"
                  files={legalPhotoProFile}
                  onChange={(files, type, index) => { onFileChange(files, type, index, 'legalPhotoPro'); }}
                  onImageClick={(index, fs) => console.log(index, fs)}
                  selectable={legalPhotoProFile.length < 1}
                />
              </Flex.Item>
              <Flex.Item
                className="my-flexbox-item"
              >
                <div className={styles.img_title}>身份证信息页</div>
              </Flex.Item>
            </Flex.Item>
            <Flex.Item>
              <Flex.Item>
                <ImagePicker
                  className="my-image-picker-idCon"
                  files={legalPhotoConFile}
                  onChange={(files, type, index) => { onFileChange(files, type, index, 'legalPhotoCon'); }}
                  onImageClick={(index, fs) => console.log(index, fs)}
                  selectable={legalPhotoConFile.length < 1}
                />
              </Flex.Item>
              <Flex.Item
                className="my-flexbox-item"
              >
                <div className={styles.img_title}>身份证国徽页</div>
              </Flex.Item>
            </Flex.Item>
          </Flex>
        </List>
        <Button className="btn my-bottom-btn" type="primary" onClick={onSubmit}>确认</Button>
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
