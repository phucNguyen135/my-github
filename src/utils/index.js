let timer;
export const debounced = (fn, time = 500) => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    fn();
    timer = null;
  }, time);
};

export function pickField(o, ...fields) {
  return fields.reduce((a, x) => {
    if (o.hasOwnProperty(x)) a[x] = o[x];
    return a;
  }, {});
}

export const getTimeFormatNormal = (time = new Date()) => {
  const formatNumber = (value) => `${value}`.replace(/^[0-9]$/, (a) => `0${a}`);
  return `${formatNumber(time.getDate())}/${formatNumber(
    time.getMonth() + 1
  )}/${time.getFullYear()}`;
};
