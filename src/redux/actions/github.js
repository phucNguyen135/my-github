import store from "../configureStore";
import { CONFIG } from "../../config";
import { TYPE } from "../type";
import { checkRequest } from "../../utils";

const { dispatch } = store;

export const actionUserSearch = async (text) => {
  dispatch({ type: TYPE.USER_SEARCH });
  const response = await fetch(`${CONFIG.GITHUB_API}/search/users?q=${text}`);
  const responseJSON = await response.json();
  if (checkRequest(responseJSON)) {
    dispatch({
      type: TYPE.USER_SEARCH_SUCCESS,
      payload: responseJSON.items.map((_) => ({ ..._, title: _.login })),
    });
  }
};

export const actionSetCurrentUser = async (user) => {
  dispatch({ type: TYPE.SET_CURRENT_USER, payload: user });
};

export const actionSetLoading = (loading) => {
  dispatch({ type: TYPE.SET_LOADING, payload: loading });
};

export const actionOrganizationSearch = async (username) => {
  const response = await fetch(`${CONFIG.GITHUB_API}/users/${username}/orgs`);
  const responseJSON = await response.json();
  if (checkRequest(responseJSON))
    dispatch({ type: TYPE.ORGANIZATION_SEARCH, payload: responseJSON });
};

export const actionRepoSearch = async (text) => {
  const response = await fetch(`${CONFIG.GITHUB_API}/users/${text}/repos`);
  const responseJSON = await response.json();
  if (checkRequest(responseJSON))
    dispatch({ type: TYPE.REPO_SEARCH, payload: responseJSON });
};
