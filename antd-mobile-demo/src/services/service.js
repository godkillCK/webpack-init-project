import request from '../utils/request';

export async function getAccountInfo() {
  return request('../service/ic/account/detail', {
    method: 'GET',
    credentials: 'same-origin',
  });
}

export async function updateAccountInfo(values) {
  return request('../service/ic/account/updateAccountInfo', {
    method: 'POST',
    credentials: 'same-origin',
    body: values,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function updateAccountSafeInfo(values) {
  return request('../service/ic/account/updateSafeInfo', {
    method: 'POST',
    credentials: 'same-origin',
    body: values,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
