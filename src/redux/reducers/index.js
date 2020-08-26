import { combineReducers } from "redux";
import github from "./github";
import modal from "./modal";

export default combineReducers({
  github,
  modal,
});
