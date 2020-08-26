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
  const _handleSearchText = useCallback((e) => {
    const { value } = e.target;
    debounced(async () => {
      actionUserSearch(value);
    });
  }, []);

  const _handleResultSelect = useCallback(async (e, data) => {
    if (data.results?.[0]?.login) {
      const username = data.results[0].login;
      actionSetLoading(true);
      await Promise.all([
        actionSetCurrentUser(data.results[0]),
        actionRepoSearch(username),
        actionOrganizationSearch(username),
      ]);
      actionSetLoading(false);
    }
  }, []);

  const _resultRenderer = (item) => {
    return (
      <Item>
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
      onResultSelect={_handleResultSelect}
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
