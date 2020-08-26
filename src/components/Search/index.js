import React, { useCallback } from "react";
import { debounced } from "../../utils";
import { connect } from "react-redux";
import { Item, Search } from "semantic-ui-react";
import {
  actionOrganizationSearch,
  actionRepoSearch,
  actionSetCurrentUser,
  actionSetLoading,
  actionUserSearch,
} from "../../redux/actions/github";

const SearchUser = (props) => {
  const _handleSearchText = useCallback((e, data) => {
    if (data.value)
      debounced(async () => {
        actionUserSearch(data.value);
      });
  }, []);

  const _handleResultSelect = useCallback(
    (item) => async () => {
      try {
        if (item) {
          actionSetLoading(true);
          await Promise.all([
            actionSetCurrentUser(item),
            actionRepoSearch(item.login),
            actionOrganizationSearch(item.login),
          ]);
        }
      } catch (e) {}
      actionSetLoading(false);
    },
    []
  );

  const _resultRenderer = (item) => {
    return (
      <Item onClick={_handleResultSelect(item)} key={item.id}>
        <Item.Image size="tiny" src={item.avatar_url} />
        <Item.Content>
          <Item.Header as="a">{item.login}</Item.Header>
        </Item.Content>
      </Item>
    );
  };

  return (
    <Search
      width={12}
      placeholder="Search github"
      loading={props.isSearching}
      onSearchChange={_handleSearchText}
      resultRenderer={_resultRenderer}
      results={props.users}
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
