import { TYPE } from "../type";

const defaultState = {
  isSearching: false,
  users: [],
  isLoading: false,
  organizations: [],
  repos: [],
  currentUser: null,
};

const github = (state = defaultState, action) => {
  switch (action.type) {
    case TYPE.USER_SEARCH:
      return { ...state, isSearching: true };
    case TYPE.USER_SEARCH_SUCCESS:
      return { ...state, isSearching: false, users: action.payload };
    case TYPE.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case TYPE.ORGANIZATION_SEARCH:
      return { ...state, organizations: action.payload };
    case TYPE.REPO_SEARCH:
      return { ...state, repos: action.payload };
    case TYPE.SET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};

export default github;
