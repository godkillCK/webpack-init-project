import React from 'react';
import { connect } from 'dva/mobile';
import { NavBar, Picker, List, InputItem, Switch, Stepper, Slider, Button, Modal, DatePicker, Flex, Checkbox } from 'antd-mobile';
import { createForm } from 'rc-form';
import moment from 'moment';
import 'moment/locale/zh-cn';
import district from '../models/district';
import styles from './RealnameOrgan.css';

const Item = List.Item;
const zhNow = moment().locale('zh-cn').utcOffset(8);

function RealnameOrgan({ dispatch, organTypeList, organType, form, messageVisible, message }) {
  const showMessage = (m, e) => {
    // 现象：如果弹出的弹框上的 x 按钮的位置、和手指点击 button 时所在的位置「重叠」起来，
    // 会触发 x 按钮的点击事件而导致关闭弹框 (注：弹框上的取消/确定等按钮遇到同样情况也会如此)
    e.preventDefault(); // 修复 Android 上点击穿透
    dispatch({
      type: 'realnameOrgan/showMessage',
      payload: {
        messageVisible: true,
        message: m,
      },
    });
  };
  const onClose = () => {
    dispatch({
      type: 'realnameOrgan/showMessage',
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
        // next
      }
    });
  };
  const validateName = (rule, value, callback) => {
    if (/^[a-zA-z\u0391-\uFFE5\(\)][^\[\]]+$/.test(value)) {
      callback();
    } else {
      callback(new Error('只能包括中文/英文字母'));
    }
  };
  const { getFieldProps, getFieldError } = form;
  const changeOrganType = (value) => {
    dispatch({
      type: 'realnameOrgan/changeOrganType',
      payload: {
        organType: value,
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
          renderHeader={() => '单位类型'}
        >
          <Picker
            data={organTypeList}
            cols={1}
            value={organType}
            onChange={changeOrganType}
          >
            <List.Item arrow="horizontal">请选择单位类型</List.Item>
          </Picker>
        </List>
        <List
          renderHeader={() => '企业信息'}
          renderFooter={() => getFieldError('name') && getFieldError('name').join(',')}
        >
          <InputItem
            labelNumber={6}
            {...getFieldProps('name', {
              rules: [
                { required: true, message: '请输入企业名称' },
                { validator: validateName },
              ],
            })}
            clear
            error={!!getFieldError('name')}
            onErrorClick={(e) => {
              showMessage(getFieldError('name').join('、'), e);
            }}
            placeholder="请输入企业名称"
          >
            企业名称
          </InputItem>
          <InputItem
            labelNumber={6}
            {...getFieldProps('regCode', {
              rules: [],
            })}
            clear
            error={!!getFieldError('regCode')}
            onErrorClick={(e) => {
              showMessage(getFieldError('regCode').join('、'), e);
            }}
            placeholder=""
          >
            注册号
          </InputItem>
          <Picker
            extra="请选择" data={district} title="选择地区" {...getFieldProps('district')}
          >
            <List.Item arrow="horizontal">实际营业地址</List.Item>
          </Picker>
          <InputItem
            labelNumber={6}
            {...getFieldProps('address', {
              rules: [
                { required: true, message: '请输入详细地址' },
              ],
            })}
            clear
            error={!!getFieldError('address')}
            onErrorClick={(e) => {
              showMessage(getFieldError('address').join('、'), e);
            }}
            placeholder="请输入详细地址"
          >
            详细地址
          </InputItem>
          <DatePicker
            mode="date"
            title="选择日期"
            extra="请选择"
            {...getFieldProps('organEndTime')}
          >
            <List.Item arrow="horizontal">营业期限</List.Item>
          </DatePicker>
          <InputItem
            labelNumber={6}
            {...getFieldProps('organCode', {
              rules: [
                { required: true, message: '请输入组织机构代码' },
              ],
            })}
            clear
            error={!!getFieldError('organCode')}
            onErrorClick={(e) => {
              showMessage(getFieldError('organCode').join('、'), e);
            }}
            placeholder="请输入组织机构代码"
          >
            组织机构代码
          </InputItem>
          <Flex style={{ height: '0.9rem', paddingLeft: '0.3rem', paddingRight: '0.3rem' }}>
            <Flex.Item style={{ flex: 6 }}>填写人身份</Flex.Item>
            <Flex.Item style={{ flex: 12 }}>
              <Checkbox defaultChecked>代理人</Checkbox>
              <Checkbox style={{ marginLeft: '0.3rem' }}>法人</Checkbox>
            </Flex.Item>
          </Flex>
          <Item
            extra={<Switch {...getFieldProps('1', { initialValue: true, valuePropName: 'checked' })} />}
          >
            确认信息
          </Item>
        </List>
        <Button className="btn" type="primary" onClick={onSubmit}>下一步</Button>
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
  const { organTypeList, organType, messageVisible, message } = state.realnameOrgan;
  return { organTypeList, organType, messageVisible, message };
}

export default connect(mapStateToProps)(createForm()(RealnameOrgan));
