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

export const checkRequest = (response, responseJSON, dispatch) => {
  const isOk = response.status < 400;
  if (!isOk) {
    dispatch(
      actionOpenModal(
        "Error",
        responseJSON.message || "There is something wrong!"
      )
    );
  }
  return isOk;
};

export const getTimeFormatNormal = (time = new Date()) => {
  const formatNumber = (value) => `${value}`.replace(/^[0-9]$/, (a) => `0${a}`);
  return `${formatNumber(time.getDate())}/${formatNumber(
    time.getMonth() + 1
  )}/${time.getFullYear()}`;
};
