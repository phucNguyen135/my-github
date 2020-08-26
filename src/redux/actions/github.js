import store from "../configureStore";
import { CONFIG } from "../../config";
import { TYPE } from "../type";

const { dispatch } = store;

export const actionUserSearch = async (text) => {
  try {
    dispatch({ type: TYPE.USER_SEARCH });
    const response = await fetch(`${CONFIG.GITHUB_API}/search/users?q=${text}`);
    const responseJSON = await response.json();
    dispatch({ type: TYPE.USER_SEARCH_SUCCESS, payload: responseJSON.items });
  } catch (e) {
    dispatch({ type: TYPE.USER_SEARCH_SUCCESS, payload: [] });
  }
};

export const actionSetCurrentUser = async (user) => {
  dispatch({ type: TYPE.SET_CURRENT_USER, payload: user });
};

export const actionSetLoading = (loading) => {
  dispatch({ type: TYPE.SET_LOADING, payload: loading });
};

export const actionOrganizationSearch = async (username) => {
  try {
    const response = await fetch(`${CONFIG.GITHUB_API}/users/${username}/orgs`);
    const responseJSON = await response.json();
    dispatch({ type: TYPE.ORGANIZATION_SEARCH, payload: responseJSON });
  } catch (e) {
    dispatch({ type: TYPE.ORGANIZATION_SEARCH, payload: [] });
  }
};

export const actionRepoSearch = async (text) => {
  try {
    const response = await fetch(`${CONFIG.GITHUB_API}/users/${text}/repos`);
    const responseJSON = await response.json();
    dispatch({ type: TYPE.REPO_SEARCH, payload: responseJSON });
  } catch (e) {
    dispatch({ type: TYPE.REPO_SEARCH, payload: [] });
  }
};
