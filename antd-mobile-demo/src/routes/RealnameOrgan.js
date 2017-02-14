import React from 'react';
import { connect } from 'dva/mobile';
import { NavBar, Picker, List, InputItem, NoticeBar, Button, Modal, DatePicker, Flex, Checkbox, ActivityIndicator } from 'antd-mobile';
import { createForm } from 'rc-form';
import { isEmptyObj } from '../utils/commonutil';
// import { moment } from 'moment';
// import 'moment/locale/zh-cn';
import district from '../models/district';
import styles from './mixins.less';

// const Item = List.Item;
// const zhNow = moment().locale('zh-cn').utcOffset(8);
const AgreeItem = Checkbox.AgreeItem;

function RealnameOrgan(props) {
  const { loading, dispatch, organTypeList, legalAreaList, accountInfo, form, messageVisible, message } = props;
  let organType = ['0'];
  let legalArea = ['0'];
  let userType = 1;
  let licenseType = 0;
  let name = '';
  let regCode = '';
  let organEndTime = '0';
  let organCode = '';
  let legalName = '';
  let legalIdNo = '';
  let agentName = '';
  let agentIdNo = '';
  if (!isEmptyObj(accountInfo) && !isEmptyObj(accountInfo.data) && !isEmptyObj(accountInfo.data.organize)) {
    const organize = accountInfo.data.organize;
    organType = [organize.organType.toString()];
    legalArea = [organize.legalArea.toString()];
    userType = organize.userType;
    licenseType = organize.licenseType;
    name = organize.name;
    regCode = organize.regCode;
    organEndTime = organize.organEndTime;
    organCode = organize.organCode;
    legalName = organize.legalName;
    legalIdNo = organize.legalIdNo;
    agentName = organize.agentName;
    agentIdNo = organize.agentIdNo;
  }
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
  const { getFieldProps, getFieldError } = form;
  const onSubmit = (e) => {
    // dispatch({
    //   type: 'realnameOrgan/updateAccountInfo',
    //   payload: '{"bankNum":"123456","bank":"test-test","organize":{"name":"test21","userType":"2","regCode":"","organType":"0","organEndTime":"0","organCode":"913301087458306077","legalArea":"0","legalName":"陈凯","legalIdNo":"430181199002040335","licenseType":"1","address":"中国-北京市-北京市-test11"}}',
    // });
    form.validateFields({ force: true }, (error) => {
      if (error) {
        showMessage('校验失败', e);
      } else {
        dispatch({
          type: 'realnameOrgan/updateAccountInfo',
          payload: '{"bankNum":"123456","bank":"test-test","organize":{"name":"test21","userType":"2","regCode":"","organType":"0","organEndTime":"0","organCode":"913301087458306077","legalArea":"0","legalName":"陈凯","legalIdNo":"430181199002040335","licenseType":"1","address":"中国-北京市-北京市-test11"}}',
        });
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
  const changeOrganType = (value) => {
    dispatch({
      type: 'realnameOrgan/changeOrganType',
      payload: {
        organType: value,
      },
    });
  };
  const changeLegalArea = (value) => {
    dispatch({
      type: 'realnameOrgan/changeLegalArea',
      payload: {
        legalArea: value,
      },
    });
  };
  const changeUserType = (e, value) => {
    dispatch({
      type: 'realnameOrgan/changeUserType',
      payload: {
        userType: value,
      },
    });
  };
  const changeLicenseType = (e, value) => {
    dispatch({
      type: 'realnameOrgan/changeLicenseType',
      payload: {
        licenseType: value,
      },
    });
  };
  const onChangeOrganizeField = (fieldName, value) => {
    dispatch({
      type: 'realnameOrgan/onChangeOrganizeField',
      payload: {
        fieldName,
        value,
      },
    });
  };
  let organInfoList = null;
  switch (organType[0]) {
    case '0':
      organInfoList = () => (
        <div>
          <Flex className={styles.form_flex_border}>
            <Flex.Item style={{ flex: 6 }}>证件类型</Flex.Item>
            <Flex.Item style={{ flex: 12 }}>
              <Flex.Item>
                <Checkbox onChange={(e) => { changeLicenseType(e, 0); }} checked={licenseType === 0}>普通营业执照</Checkbox>
              </Flex.Item>
              <Flex.Item
                className="my-flexbox-item"
              >
                <Checkbox onChange={(e) => { changeLicenseType(e, 1); }} checked={licenseType === 1}>多证合一营业执照</Checkbox>
              </Flex.Item>
            </Flex.Item>
          </Flex>
          <InputItem
            labelNumber={6}
            {...getFieldProps('name', {
              initialValue: name,
              // validateTrigger: 'onChange',
              onChange(value) {
                onChangeOrganizeField('name', value);
              },
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
          { licenseType === 0 ?
            <InputItem
              labelNumber={6}
              {...getFieldProps('regCode', {
                initialValue: regCode,
                onChange(value) {
                  onChangeOrganizeField('regCode', value);
                },
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
            </InputItem> :
            null }
        </div>
      );
      break;
    case '1':
      organInfoList = () => (
        <div>
          <InputItem
            labelNumber={6}
            {...getFieldProps('name1', {
              initialValue: name,
              onChange(value) {
                onChangeOrganizeField('name', value);
              },
              rules: [
                { required: true, message: '请输入社会团体名称' },
                { validator: validateName },
              ],
            })}
            clear
            error={!!getFieldError('name1')}
            onErrorClick={(e) => {
              showMessage(getFieldError('name1').join('、'), e);
            }}
            placeholder="请输入社会团体名称"
          >
            社会团体名称
          </InputItem>
          <InputItem
            labelNumber={6}
            {...getFieldProps('regCode1', {
              initialValue: regCode,
              onChange(value) {
                onChangeOrganizeField('regCode', value);
              },
              rules: [],
            })}
            clear
            error={!!getFieldError('regCode1')}
            onErrorClick={(e) => {
              showMessage(getFieldError('regCode1').join('、'), e);
            }}
            placeholder=""
          >
            社证号
          </InputItem>
        </div>
      );
      break;
    case '2':
      organInfoList = () => (
        <div>
          <InputItem
            labelNumber={6}
            {...getFieldProps('name2', {
              initialValue: name,
              onChange(value) {
                onChangeOrganizeField('name', value);
              },
              rules: [
                { required: true, message: '请输入事业单位名称' },
                { validator: validateName },
              ],
            })}
            clear
            error={!!getFieldError('name2')}
            onErrorClick={(e) => {
              showMessage(getFieldError('name2').join('、'), e);
            }}
            placeholder="请输入事业单位名称"
          >
            事业单位名称
          </InputItem>
          <InputItem
            labelNumber={6}
            {...getFieldProps('regCode2', {
              initialValue: regCode,
              onChange(value) {
                onChangeOrganizeField('regCode', value);
              },
              rules: [],
            })}
            clear
            error={!!getFieldError('regCode2')}
            onErrorClick={(e) => {
              showMessage(getFieldError('regCode2').join('、'), e);
            }}
            placeholder=""
          >
            事证号
          </InputItem>
        </div>
      );
      break;
    case '3':
      organInfoList = () => (
        <div>
          <InputItem
            labelNumber={6}
            {...getFieldProps('name3', {
              initialValue: name,
              onChange(value) {
                onChangeOrganizeField('name', value);
              },
              rules: [
                { required: true, message: '请输入民办非企业单位信息' },
                { validator: validateName },
              ],
            })}
            clear
            error={!!getFieldError('name3')}
            onErrorClick={(e) => {
              showMessage(getFieldError('name3').join('、'), e);
            }}
            placeholder="请输入民办非企业单位信息"
          >
            民办单位名称
          </InputItem>
          <InputItem
            labelNumber={6}
            {...getFieldProps('regCode3', {
              initialValue: regCode,
              onChange(value) {
                onChangeOrganizeField('regCode', value);
              },
              rules: [],
            })}
            clear
            error={!!getFieldError('regCode3')}
            onErrorClick={(e) => {
              showMessage(getFieldError('regCode3').join('、'), e);
            }}
            placeholder=""
          >
            民证字号
          </InputItem>
        </div>
      );
      break;
    case '4':
      organInfoList = () => (
        <div>
          <InputItem
            labelNumber={6}
            {...getFieldProps('name4', {
              initialValue: name,
              onChange(value) {
                onChangeOrganizeField('name', value);
              },
              rules: [
                { required: true, message: '请输入单位名称' },
                { validator: validateName },
              ],
            })}
            clear
            error={!!getFieldError('name4')}
            onErrorClick={(e) => {
              showMessage(getFieldError('name4').join('、'), e);
            }}
            placeholder="请输入单位名称"
          >
            单位名称
          </InputItem>
          <InputItem
            labelNumber={6}
            {...getFieldProps('regCode4', {
              initialValue: regCode,
              onChange(value) {
                onChangeOrganizeField('regCode', value);
              },
              rules: [],
            })}
            clear
            error={!!getFieldError('regCode4')}
            onErrorClick={(e) => {
              showMessage(getFieldError('regCode4').join('、'), e);
            }}
            placeholder=""
          >
            执法证号
          </InputItem>
        </div>
      );
      break;
    default:
      organInfoList = () => (null);
  }
  let idCardIdNoElm = null;
  switch (legalArea[0]) {
    case '0':
      idCardIdNoElm = () => (
        <InputItem
          labelNumber={6}
          {...getFieldProps('legalIdNo', {
            initialValue: legalIdNo,
            onChange(value) {
              onChangeOrganizeField('legalIdNo', value);
            },
            rules: [
              { required: true, message: '请输入身份证号' },
            ],
          })}
          clear
          error={!!getFieldError('legalIdNo')}
          onErrorClick={(e) => {
            showMessage(getFieldError('legalIdNo').join('、'), e);
          }}
          placeholder="请输入身份证号"
        >
          身份证号
        </InputItem>
      );
      break;
    case '1':
      idCardIdNoElm = () => (
        <InputItem
          labelNumber={6}
          {...getFieldProps('legalIdNo1', {
            initialValue: legalIdNo,
            onChange(value) {
              onChangeOrganizeField('legalIdNo', value);
            },
            rules: [
              { required: true, message: '请输入港澳居民来往内地通行证' },
            ],
          })}
          clear
          error={!!getFieldError('legalIdNo1')}
          onErrorClick={(e) => {
            showMessage(getFieldError('legalIdNo1').join('、'), e);
          }}
          placeholder="请输入港澳居民来往内地通行证"
        >
          港澳居民来往内地通行证
        </InputItem>
      );
      break;
    case '2':
      idCardIdNoElm = () => (
        <InputItem
          labelNumber={6}
          {...getFieldProps('legalIdNo2', {
            initialValue: legalIdNo,
            onChange(value) {
              onChangeOrganizeField('legalIdNo', value);
            },
            rules: [
              { required: true, message: '请输入港澳居民来往内地通行证' },
            ],
          })}
          clear
          error={!!getFieldError('legalIdNo2')}
          onErrorClick={(e) => {
            showMessage(getFieldError('legalIdNo2').join('、'), e);
          }}
          placeholder="请输入港澳居民来往内地通行证"
        >
          港澳居民来往内地通行证
        </InputItem>
      );
      break;
    case '3':
      idCardIdNoElm = () => (
        <InputItem
          labelNumber={6}
          {...getFieldProps('legalIdNo3', {
            initialValue: legalIdNo,
            onChange(value) {
              onChangeOrganizeField('legalIdNo', value);
            },
            rules: [
              { required: true, message: '请输入台胞证' },
            ],
          })}
          clear
          error={!!getFieldError('legalIdNo3')}
          onErrorClick={(e) => {
            showMessage(getFieldError('legalIdNo3').join('、'), e);
          }}
          placeholder="请输入台胞证"
        >
          台胞证
        </InputItem>
      );
      break;
    case '4':
      idCardIdNoElm = () => (
        <InputItem
          labelNumber={6}
          {...getFieldProps('legalIdNo4', {
            initialValue: legalIdNo,
            onChange(value) {
              onChangeOrganizeField('legalIdNo', value);
            },
            rules: [
              { required: true, message: '请输入护照号' },
            ],
          })}
          clear
          error={!!getFieldError('legalIdNo4')}
          onErrorClick={(e) => {
            showMessage(getFieldError('legalIdNo4').join('、'), e);
          }}
          placeholder="请输入护照号"
        >
          护照号
        </InputItem>
      );
      break;
    default:
      idCardIdNoElm = () => (null);
  }
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
          // renderFooter={() => getFieldError('name') && getFieldError('name').join(',')}
        >
          {organInfoList()}
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
            disabled={false}
            mode="date"
            title={
              <AgreeItem defaultChecked={organEndTime === '0'} onChange={e => console.log('checkbox', e)}>
                无期限
              </AgreeItem>
            }
            extra="请选择"
            {...getFieldProps('organEndTime', {
              initialValue: organEndTime === '0' ? null : organEndTime,
              // onChange(value) {
              //   onChangeOrganizeField('organEndTime', value);
              // },
            })}
          >
            <List.Item arrow="horizontal">营业期限</List.Item>
          </DatePicker>
          { organType[0] === '0' && licenseType === 1 ?
            <InputItem
              labelNumber={6}
              {...getFieldProps('organCode', {
                initialValue: organCode,
                onChange(value) {
                  onChangeOrganizeField('organCode', value);
                },
                rules: [
                  { required: true, message: '请输入社会信用代码' },
                ],
              })}
              clear
              error={!!getFieldError('organCode')}
              onErrorClick={(e) => {
                showMessage(getFieldError('organCode').join('、'), e);
              }}
              placeholder="请输入社会信用代码"
            >
              社会信用代码
            </InputItem> :
            <InputItem
              labelNumber={6}
              {...getFieldProps('organCode1', {
                initialValue: organCode,
                onChange(value) {
                  onChangeOrganizeField('organCode', value);
                },
                rules: [
                  { required: true, message: '请输入组织机构代码' },
                ],
              })}
              clear
              error={!!getFieldError('organCode1')}
              onErrorClick={(e) => {
                showMessage(getFieldError('organCode1').join('、'), e);
              }}
              placeholder="请输入组织机构代码"
            >
              组织机构代码
            </InputItem> }
          <Flex className={styles.form_flex}>
            <Flex.Item style={{ flex: 6 }}>填写人身份</Flex.Item>
            <Flex.Item style={{ flex: 12 }}>
              <Checkbox onChange={(e) => { changeUserType(e, 1); }} checked={userType === 1}>代理人</Checkbox>
              <Checkbox onChange={(e) => { changeUserType(e, 2); }} checked={userType === 2} style={{ marginLeft: '0.3rem' }}>法人</Checkbox>
            </Flex.Item>
          </Flex>
        </List>
        <List
          renderHeader={() => '法人信息'}
        >
          <Picker
            data={legalAreaList}
            cols={1}
            value={legalArea}
            onChange={changeLegalArea}
          >
            <List.Item arrow="horizontal">法人归属地</List.Item>
          </Picker>
          <InputItem
            labelNumber={6}
            {...getFieldProps('legalName', {
              initialValue: legalName,
              onChange(value) {
                onChangeOrganizeField('legalName', value);
              },
              rules: [
                { required: true, message: '请输入法人姓名' },
              ],
            })}
            clear
            error={!!getFieldError('legalName')}
            onErrorClick={(e) => {
              showMessage(getFieldError('legalName').join('、'), e);
            }}
            placeholder="请输入法人姓名"
          >
            法人姓名
          </InputItem>
          {idCardIdNoElm()}
        </List>
        { userType === 1 ?
          <List
            renderHeader={() => '代理人信息'}
          >
            <InputItem
              labelNumber={6}
              {...getFieldProps('agentName', {
                initialValue: agentName,
                onChange(value) {
                  onChangeOrganizeField('agentName', value);
                },
                rules: [
                  { required: true, message: '请输入代理人姓名' },
                ],
              })}
              clear
              error={!!getFieldError('agentName')}
              onErrorClick={(e) => {
                showMessage(getFieldError('agentName').join('、'), e);
              }}
              placeholder="请输入代理人姓名"
            >
              代理人姓名
            </InputItem>
            <InputItem
              labelNumber={6}
              {...getFieldProps('agentIdNo', {
                initialValue: agentIdNo,
                onChange(value) {
                  onChangeOrganizeField('agentIdNo', value);
                },
                rules: [
                  { required: true, message: '请输入身份证号' },
                ],
              })}
              clear
              error={!!getFieldError('agentIdNo')}
              onErrorClick={(e) => {
                showMessage(getFieldError('agentIdNo').join('、'), e);
              }}
              placeholder="请输入身份证号"
            >
              身份证号
            </InputItem>
            <DatePicker
              mode="date"
              title="选择日期"
              extra="请选择"
              {...getFieldProps('agentEndTime')}
            >
              <List.Item arrow="horizontal">身份证有效期</List.Item>
            </DatePicker>
          </List> :
          null }
        <List
          renderHeader={() => '银行账户信息'}
        >
          <NoticeBar className="my-notice-bar" type="info">e签宝将给此对公账户汇入一笔1元以下资金；若公司名和对公账户开户名不一致，资金将汇入失败</NoticeBar>
          <InputItem
            labelNumber={6}
            {...getFieldProps('bank', {
              rules: [
                { required: true, message: '请输入开户银行名称' },
              ],
            })}
            clear
            error={!!getFieldError('bank')}
            onErrorClick={(e) => {
              showMessage(getFieldError('bank').join('、'), e);
            }}
            placeholder="请输入开户银行名称"
          >
            开户银行
          </InputItem>
          <InputItem
            labelNumber={6}
            {...getFieldProps('subbranch', {
              rules: [
                { required: true, message: '请输入开户银行支行名称' },
              ],
            })}
            clear
            error={!!getFieldError('subbranch')}
            onErrorClick={(e) => {
              showMessage(getFieldError('subbranch').join('、'), e);
            }}
            placeholder="请输入开户银行支行名称"
          >
            开户支行名称
          </InputItem>
          <InputItem
            labelNumber={6}
            {...getFieldProps('bankNum', {
              rules: [
                { required: true, message: '请输入开户银行账号' },
              ],
            })}
            clear
            error={!!getFieldError('bankNum')}
            onErrorClick={(e) => {
              showMessage(getFieldError('bankNum').join('、'), e);
            }}
            placeholder="请输入开户银行账号"
          >
            开户银行账号
          </InputItem>
        </List>
        <Button className="btn" style={{ marginTop: 30 }} type="primary" onClick={onSubmit}>下一步</Button>
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
  return { ...state.realnameOrgan, loading: state.loading.global };
}

export default connect(mapStateToProps)(createForm()(RealnameOrgan));
