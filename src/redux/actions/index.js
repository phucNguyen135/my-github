import store from "../configureStore";

const { dispatch } = store;

export const actionSearchUser = async (text) => {
  const response = await fetch(`https://api.github.com/search/users?q=${text}`);
  dispatch({
    type: "SEARCH_USER",
  });
};
