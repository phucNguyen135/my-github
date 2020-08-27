import { TYPE } from "../type";

export const actionOpenModal = (header, message) => (dispatch) => {
  dispatch({ type: TYPE.OPEN_MODAL, payload: { header, message } });
};

export const actionCloseModal = () => (dispatch) => {
  dispatch({ type: TYPE.CLOSE_MODAL });
};
