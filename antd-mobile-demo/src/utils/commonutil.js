export function isEmptyObj(obj) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

export function getParam(url) {
  const vars = {};
  let hash;
  if (url.indexOf('?') !== -1 && url.slice(url.indexOf('?') + 1)) {
    const hashes = url.slice(url.indexOf('?') + 1).split('&');
    for (let i = 0; i < hashes.length; i += 1) {
      hash = hashes[i].split('=');
      const value = decodeURIComponent(hash[1]);
      vars[hash[0]] = value;
    }
  }
  return vars;
}
