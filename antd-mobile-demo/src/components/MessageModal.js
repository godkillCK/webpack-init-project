import React from 'react';
import { Modal } from 'antd-mobile';

const MessageModal = (props) => {
  const showMessage = (m, e) => {
    // 现象：如果弹出的弹框上的 x 按钮的位置、和手指点击 button 时所在的位置「重叠」起来，
    // 会触发 x 按钮的点击事件而导致关闭弹框 (注：弹框上的取消/确定等按钮遇到同样情况也会如此)
    e.preventDefault(); // 修复 Android 上点击穿透
    props.messageVisible = true;
    props.message = m;
  };
  const onClose = () => {
    props.messageVisible = false;
  };
  return (
    <Modal
      title=""
      transparent
      maskClosable={false}
      visible={props.messageVisible}
      onClose={onClose}
      footer={[{ text: '确定', onPress: () => { onClose(); } }]}
    >
      {props.message}
    </Modal>
  );
};

MessageModal.propTypes = {
  messageVisible: React.PropTypes.bool,
  message: React.PropTypes.string,
};

export default MessageModal;
