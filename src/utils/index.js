import { actionOpenModal } from "../redux/actions/modal";

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

export const checkRequest = (responseJSON) => {
  if (responseJSON.errors) {
    actionOpenModal("Error", responseJSON.message);
  }
  return !responseJSON.errors;
};

export const getTimeFormatNormal = (time = new Date()) => {
  const formatNumber = (value) => `${value}`.replace(/^[0-9]$/, (a) => `0${a}`);
  return `${formatNumber(time.getDate())}/${formatNumber(
    time.getMonth() + 1
  )}/${time.getFullYear()}`;
};
