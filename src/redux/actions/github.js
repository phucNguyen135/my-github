import { CONFIG } from "../../config";
import { TYPE } from "../type";
import { checkRequest } from "../../utils";

export const actionUserSearch = (text) => {
  return async (dispatch) => {
    dispatch({ type: TYPE.USER_SEARCH });
    const response = await fetch(`${CONFIG.GITHUB_API}/search/users?q=${text}`);
    const responseJSON = await response.json();
    if (checkRequest(response, responseJSON, dispatch)) {
      dispatch({
        type: TYPE.USER_SEARCH_SUCCESS,
        payload: responseJSON.items.map((_) => ({ ..._, title: _.login })),
      });
    }
  };
};

export const actionSetCurrentUser = (user) => {
  return (dispatch) => {
    dispatch({ type: TYPE.SET_CURRENT_USER, payload: user });
  };
};

export const actionSetLoading = (loading) => {
  return (dispatch) => {
    dispatch({ type: TYPE.SET_LOADING, payload: loading });
  };
};

export const actionOrganizationSearch = (username) => {
  return async (dispatch) => {
    const response = await fetch(`${CONFIG.GITHUB_API}/users/${username}/orgs`);
    const responseJSON = await response.json();
    if (checkRequest(response, responseJSON, dispatch))
      dispatch({ type: TYPE.ORGANIZATION_SEARCH, payload: responseJSON });
  };
};

export const actionRepoSearch = (text) => {
  return async (dispatch) => {
    const response = await fetch(`${CONFIG.GITHUB_API}/users/${text}/repos`);
    const responseJSON = await response.json();
    if (checkRequest(response, responseJSON, dispatch))
      dispatch({ type: TYPE.REPO_SEARCH, payload: responseJSON });
  };
};
