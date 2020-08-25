const repo = (state = [], action) => {
  switch (action.type) {
    case "SEARCH_REPO":
      return [...state];
    default:
      return state;
  }
};

export default repo;
