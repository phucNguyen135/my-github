import React, { useCallback } from "react";
import { debounced } from "../../utils";
import { connect } from "react-redux";
import { Search } from "semantic-ui-react";
import { actionUserSearch } from "../../redux/actions/github";
import SearchResultItem from "./SearchResultItem";

const SearchUser = (props) => {
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
      loading={props.isSearching}
      onSearchChange={_handleSearchText}
      resultRenderer={_resultRenderer}
      results={props.users}
      aria-label="search-user"
      showNoResults={false}
    />
  );
};
const mapStateToProps = (state) => {
  return {
    isSearching: state.github.isSearching,
    users: state.github.users,
  };
};

export default connect(mapStateToProps)(SearchUser);
