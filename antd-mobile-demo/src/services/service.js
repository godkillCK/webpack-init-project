import request from '../utils/request';

export async function updateAccountInfo(values) {
  return request('http://localhost:8080/ic/service/ic/account/updateAccountInfo', {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify(values),
  });
}
