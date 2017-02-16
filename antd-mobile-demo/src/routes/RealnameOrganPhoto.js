import React from 'react';
import classnames from 'classnames';
import { connect } from 'dva/mobile';
import { NavBar, List, Button, Modal, ActivityIndicator, ImagePicker, Flex } from 'antd-mobile';
import { createForm } from 'rc-form';
import { isEmptyObj } from '../utils/commonutil';
// import { moment } from 'moment';
// import 'moment/locale/zh-cn';
import styles from './mixins.less';

// const Item = List.Item;
// const zhNow = moment().locale('zh-cn').utcOffset(8);

function RealnameOrganPhoto(props) {
  const { loading, dispatch, organType, licenseType, userType, regPhotoFile, organPhotoFile, legalPhotoProFile, legalPhotoConFile, agentPhotoProFile, agentPhotoConFile, agentPhotoFile, proxyPhotoFile, form, messageVisible, message } = props;
  const btnCls = classnames({
    btn: true,
    'my-bottom-btn': userType !== 1,
  });
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
  let organPhotoList = null;
  switch (organType) {
    case 0:
      organPhotoList = () => {
        return (
          <List
            renderHeader={() => '企业法人营业执照及组织机构代码证'}
          >
            <Flex>
              <Flex.Item>
                <Flex.Item>
                  <ImagePicker
                    className="my-image-picker-reg0"
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
              </Flex.Item>
              { licenseType === 0 ?
                <Flex.Item>
                  <Flex.Item>
                    <ImagePicker
                      className="my-image-picker-organ"
                      files={organPhotoFile}
                      onChange={(files, type, index) => { onFileChange(files, type, index, 'organPhoto'); }}
                      onImageClick={(index, fs) => console.log(index, fs)}
                      selectable={organPhotoFile.length < 1}
                    />
                  </Flex.Item>
                  <Flex.Item
                    className="my-flexbox-item"
                  >
                    <div className={styles.img_title}>组织机构代码证</div>
                  </Flex.Item>
                </Flex.Item> :
                <Flex.Item />
              }
            </Flex>
          </List>
        );
      };
      break;
    case 1:
      organPhotoList = () => {
        return (
          <List
            renderHeader={() => '社会团体法人登记证书及组织机构代码证'}
          >
            <Flex>
              <Flex.Item>
                <Flex.Item>
                  <ImagePicker
                    className="my-image-picker-reg1"
                    files={regPhotoFile}
                    onChange={(files, type, index) => { onFileChange(files, type, index, 'regPhoto'); }}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={regPhotoFile.length < 1}
                  />
                </Flex.Item>
                <Flex.Item
                  className="my-flexbox-item"
                >
                  <div className={styles.img_title}>社会团体法人登记证书</div>
                </Flex.Item>
              </Flex.Item>
              <Flex.Item>
                <Flex.Item>
                  <ImagePicker
                    className="my-image-picker-organ"
                    files={organPhotoFile}
                    onChange={(files, type, index) => { onFileChange(files, type, index, 'organPhoto'); }}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={organPhotoFile.length < 1}
                  />
                </Flex.Item>
                <Flex.Item
                  className="my-flexbox-item"
                >
                  <div className={styles.img_title}>组织机构代码证</div>
                </Flex.Item>
              </Flex.Item>
            </Flex>
          </List>
        );
      };
      break;
    case 2:
      organPhotoList = () => {
        return (
          <List
            renderHeader={() => '事业单位法人证书及组织机构代码证'}
          >
            <Flex>
              <Flex.Item>
                <Flex.Item>
                  <ImagePicker
                    className="my-image-picker-reg2"
                    files={regPhotoFile}
                    onChange={(files, type, index) => { onFileChange(files, type, index, 'regPhoto'); }}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={regPhotoFile.length < 1}
                  />
                </Flex.Item>
                <Flex.Item
                  className="my-flexbox-item"
                >
                  <div className={styles.img_title}>事业单位法人证书</div>
                </Flex.Item>
              </Flex.Item>
              <Flex.Item>
                <Flex.Item>
                  <ImagePicker
                    className="my-image-picker-organ"
                    files={organPhotoFile}
                    onChange={(files, type, index) => { onFileChange(files, type, index, 'organPhoto'); }}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={organPhotoFile.length < 1}
                  />
                </Flex.Item>
                <Flex.Item
                  className="my-flexbox-item"
                >
                  <div className={styles.img_title}>组织机构代码证</div>
                </Flex.Item>
              </Flex.Item>
            </Flex>
          </List>
        );
      };
      break;
    case 3:
      organPhotoList = () => {
        return (
          <List
            renderHeader={() => '民企非企业单位登记证书及组织机构代码证'}
          >
            <Flex>
              <Flex.Item>
                <Flex.Item>
                  <ImagePicker
                    className="my-image-picker-reg3"
                    files={regPhotoFile}
                    onChange={(files, type, index) => { onFileChange(files, type, index, 'regPhoto'); }}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={regPhotoFile.length < 1}
                  />
                </Flex.Item>
                <Flex.Item
                  className="my-flexbox-item"
                >
                  <div className={styles.img_title}>民企非企业单位登记证书</div>
                </Flex.Item>
              </Flex.Item>
              <Flex.Item>
                <Flex.Item>
                  <ImagePicker
                    className="my-image-picker-organ"
                    files={organPhotoFile}
                    onChange={(files, type, index) => { onFileChange(files, type, index, 'organPhoto'); }}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={organPhotoFile.length < 1}
                  />
                </Flex.Item>
                <Flex.Item
                  className="my-flexbox-item"
                >
                  <div className={styles.img_title}>组织机构代码证</div>
                </Flex.Item>
              </Flex.Item>
            </Flex>
          </List>
        );
      };
      break;
    case 4:
      organPhotoList = () => {
        return (
          <List
            renderHeader={() => '行政执法主体资格证及组织机构代码证'}
          >
            <Flex>
              <Flex.Item>
                <Flex.Item>
                  <ImagePicker
                    className="my-image-picker-reg4"
                    files={regPhotoFile}
                    onChange={(files, type, index) => { onFileChange(files, type, index, 'regPhoto'); }}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={regPhotoFile.length < 1}
                  />
                </Flex.Item>
                <Flex.Item
                  className="my-flexbox-item"
                >
                  <div className={styles.img_title}>行政执法主体资格证</div>
                </Flex.Item>
              </Flex.Item>
              <Flex.Item>
                <Flex.Item>
                  <ImagePicker
                    className="my-image-picker-organ"
                    files={organPhotoFile}
                    onChange={(files, type, index) => { onFileChange(files, type, index, 'organPhoto'); }}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={organPhotoFile.length < 1}
                  />
                </Flex.Item>
                <Flex.Item
                  className="my-flexbox-item"
                >
                  <div className={styles.img_title}>组织机构代码证</div>
                </Flex.Item>
              </Flex.Item>
            </Flex>
          </List>
        );
      };
      break;
    default:
      organPhotoList = () => (null);
  }
  return (
    <div>
      <NavBar
        onLeftClick={() => history.back()}
      >
        企业实名认证
      </NavBar>

      <form>
        {organPhotoList()}
        <List
          renderHeader={() => '法定代表人的证件照片'}
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
        { userType === 1 ?
          <div>
            <List
              renderHeader={() => '代理人证件照片'}
            >
              <Flex>
                <Flex.Item>
                  <Flex.Item>
                    <ImagePicker
                      className="my-image-picker-idPro"
                      files={agentPhotoProFile}
                      onChange={(files, type, index) => { onFileChange(files, type, index, 'agentPhotoPro'); }}
                      onImageClick={(index, fs) => console.log(index, fs)}
                      selectable={agentPhotoProFile.length < 1}
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
                      files={agentPhotoConFile}
                      onChange={(files, type, index) => { onFileChange(files, type, index, 'agentPhotoCon'); }}
                      onImageClick={(index, fs) => console.log(index, fs)}
                      selectable={agentPhotoConFile.length < 1}
                    />
                  </Flex.Item>
                  <Flex.Item
                    className="my-flexbox-item"
                  >
                    <div className={styles.img_title}>身份证国徽页</div>
                  </Flex.Item>
                </Flex.Item>
              </Flex>
              <Flex>
                <Flex.Item>
                  <Flex.Item>
                    <ImagePicker
                      className="my-image-picker-agent"
                      files={agentPhotoFile}
                      onChange={(files, type, index) => { onFileChange(files, type, index, 'agentPhoto'); }}
                      onImageClick={(index, fs) => console.log(index, fs)}
                      selectable={agentPhotoFile.length < 1}
                    />
                  </Flex.Item>
                  <Flex.Item
                    className="my-flexbox-item"
                  >
                    <div className={styles.img_title}>手持身份证照</div>
                  </Flex.Item>
                </Flex.Item>
                <Flex.Item />
              </Flex>
            </List>
            <List
              renderHeader={() => '委托书（必须盖有单位公章）'}
            >
              <Flex>
                <Flex.Item>
                  <Flex.Item>
                    <ImagePicker
                      className="my-image-picker-proxy"
                      files={proxyPhotoFile}
                      onChange={(files, type, index) => { onFileChange(files, type, index, 'proxyPhoto'); }}
                      onImageClick={(index, fs) => console.log(index, fs)}
                      selectable={proxyPhotoFile.length < 1}
                    />
                  </Flex.Item>
                  <Flex.Item
                    className="my-flexbox-item"
                  >
                    <div className={styles.img_title}>委托书扫描件</div>
                  </Flex.Item>
                </Flex.Item>
                <Flex.Item />
              </Flex>
            </List>
          </div> : null }
        <Button className={btnCls} type="primary" onClick={onSubmit}>确认</Button>
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
  const { accountInfo } = state.realnameOrgan;
  console.log(accountInfo);
  let organType = 0;// 不同企业类型 证件照不一样
  let licenseType = 1;// 为普通企业时，0：普通营业执照，1：三证合一
  let userType = 2;// 1：需要传代理人照，2：只用传法人照
  if (!isEmptyObj(accountInfo) && !isEmptyObj(accountInfo.data) && !isEmptyObj(accountInfo.data.organize)) {
    if (Object.prototype.hasOwnProperty.call(accountInfo.data.organize, 'organType')) {
      organType = accountInfo.data.organize.organType;
    }
    if (Object.prototype.hasOwnProperty.call(accountInfo.data.organize, 'licenseType')) {
      licenseType = accountInfo.data.organize.licenseType;
    }
    if (Object.prototype.hasOwnProperty.call(accountInfo.data.organize, 'userType')) {
      userType = accountInfo.data.organize.userType;
    }
  }
  return { ...state.realnameOrganPhoto, organType, licenseType, userType, loading: state.loading.global };
}

export default connect(mapStateToProps)(createForm()(RealnameOrganPhoto));
