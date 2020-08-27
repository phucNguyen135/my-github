import React, { useCallback } from "react";
import { debounced } from "../../utils";
import { useSelector } from "react-redux";
import { Search } from "semantic-ui-react";
import { actionUserSearch } from "../../redux/actions/github";
import SearchResultItem from "./SearchResultItem";

const SearchUser = () => {
  const [isSearching, users] = useSelector((state) => [
    state.github.isSearching,
    state.github.users,
  ]);

  const _handleSearchText = useCallback((e, data) => {
    if (data.value)
      debounced(async () => {
        actionUserSearch(data.value);
      });
  }, []);

  const _resultRenderer = (item) => <SearchResultItem item={item} />;

  return (
    <Search
      width={12}
      placeholder="Search github"
      loading={isSearching}
      onSearchChange={_handleSearchText}
      resultRenderer={_resultRenderer}
      results={users}
      aria-label="search-user"
      showNoResults={false}
    />
  );
};

export default SearchUser;
