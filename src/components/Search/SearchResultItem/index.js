import React from "react";
import { Item } from "semantic-ui-react";
import {
  actionOrganizationSearch,
  actionRepoSearch,
  actionSetCurrentUser,
  actionSetLoading,
} from "../../../redux/actions/github";

const SearchResultItem = ({ item }) => {
  const _handleResultSelect = async () => {
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
  };

  return (
    <Item
      onClick={_handleResultSelect}
      key={item.id}
      aria-label="search-user-results"
    >
      <Item.Image size="tiny" src={item.avatar_url} />
      <Item.Content>
        <Item.Header as="a">{item.login}</Item.Header>
      </Item.Content>
    </Item>
  );
};
export default SearchResultItem;