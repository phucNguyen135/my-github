import store from "../configureStore";
import { TYPE } from "../type";

const { dispatch } = store;

export const actionOpenModal = async (header, message) => {
  dispatch({ type: TYPE.OPEN_MODAL, payload: { header, message } });
};

export const actionCloseModal = async () => {
  dispatch({ type: TYPE.CLOSE_MODAL });
};
