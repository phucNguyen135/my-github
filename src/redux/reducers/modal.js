import { TYPE } from "../type";

const defaultState = {
  open: false,
  header: "",
  message: "",
};

const github = (state = defaultState, action) => {
  switch (action.type) {
    case TYPE.OPEN_MODAL:
      return {
        ...state,
        open: true,
        header: action.payload.header,
        message: action.payload.message,
      };
    case TYPE.CLOSE_MODAL:
      return {
        ...state,
        open: false,
        header: "",
        message: "",
      };
    default:
      return state;
  }
};

export default github;
