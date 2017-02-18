
const checkSocialCredit = (rule, value, callback) => {
  // 422301000001084
  const regexp = /^([0-9A-Z]{2})([0-9]{6})([0-9A-Z]){10}$/;
  if (!regexp.test(value)) {
    callback(new Error('请输入正确格式'));
    return;
  }

  // 代码字符集-代码字符
  const charCode = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'T', 'U', 'W', 'X', 'Y'];
  // 代码字符集-代码字符数值
  const charVal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  // 各位置序号上的加权因子
  const posWi = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];

  // 校验位校验
  const obj = value.split('');
  // ∑(ci×Wi)(mod 31)
  let sum = 0;
  let ci = 0;
  let Wi = 0;
  for (let i = 0; i < 17; i += 1) {
    ci = charVal[charCode.indexOf(obj[i])];
    Wi = posWi[i];
    sum += ci * Wi;
  }
  let c10 = 31 - (sum % 31);
  c10 = c10 === 31 ? 0 : c10;

  if (c10 === charCode.indexOf(obj[17])) {
    callback();
  } else {
    callback(new Error('请输入正确格式'));
  }
};

const checkOrganCode = (rule, value, callback) => {
  const regexp = /^([0-9A-Z]){8}[-]?[0-9A-Z]$/;
  if (!regexp.test(value)) {
    callback(new Error('请输入正确格式'));
    return;
  }

  const values = value.split('-');
  if (values.length === 1) {
    values[1] = values[0][8];
  }

  const wi = [3, 7, 9, 10, 5, 8, 4, 2];
  const str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let sum = 0;
  for (let i = 0; i < 8; i += 1) {
    sum += str.indexOf(values[0].charAt(i)) * wi[i];
  }
  let C9 = 11 - (sum % 11);
  const YC9 = `${values[1]}`;
  if (C9 === 11) {
    C9 = '0';
  } else if (C9 === 10) {
    C9 = 'X';
  } else {
    C9 = `${C9}`;
  }
  if (C9 === YC9) {
    callback();
  } else {
    callback(new Error('请输入正确格式'));
  }
};

const checkIdcardCN18 = (rule, value, callback) => {
  const regx = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|x|X){1}$/;
  if (!regx.test(value)) {
    callback(new Error('请输入正确格式'));
    return;
  }

  const wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const page = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2', '1'];

  let sum = 0;
  for (let i = 0; i < 17; i += 1) {
    sum += value.charAt(i) * wi[i];
  }

  const mod = sum % 11;

  if (page[mod] === value[17].toUpperCase()) {
    callback();
  } else {
    callback(new Error('请输入正确格式'));
  }
};

export { checkSocialCredit, checkOrganCode, checkIdcardCN18 };
