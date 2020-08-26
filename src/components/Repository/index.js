import React, { useCallback } from "react";
import { connect } from "react-redux";
import { Header, Item, Label } from "semantic-ui-react";
import { getTimeFormatNormal } from "../../utils";

const ListRepo = (props) => {
  const _renderItemRepo = useCallback(
    (repo) => (
      <Item key={repo.id}>
        <Item.Content>
          <Item.Header as="a" href={repo.html_url} target="_blank">
            {repo.name}
          </Item.Header>
          <Item.Meta>
            <span className="cinema">
              {getTimeFormatNormal(new Date(repo.created_at))}
            </span>
          </Item.Meta>
          <Item.Description>{repo.description}</Item.Description>
          <Item.Extra>
            {(repo.language && <Label>{repo.language}</Label>) || null}
          </Item.Extra>
        </Item.Content>
      </Item>
    ),
    []
  );
  if (props.repos?.length) {
    return (
      <Item.Group divided>
        <Header as="h1">Repositories</Header>
        {props.repos.map(_renderItemRepo)}
      </Item.Group>
    );
  }
  return null;
};
const mapStateToProps = (state) => {
  return {
    repos: state.github.repos,
  };
};

export default connect(mapStateToProps)(ListRepo);
