let timer;
export const debounced = (fn, time = 1000) => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    fn();
    timer = null;
  }, time);
};
