import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { Item, Label } from "semantic-ui-react";
import { getTimeFormatNormal } from "../../utils";

const ListRepo = () => {
  const [repos, currentUser] = useSelector((state) => [
    state.github.repos,
    state.github.currentUser,
  ]);

  const _renderItemRepo = useCallback(
    (repo) => (
      <Item
        key={repo.id}
        aria-label={`repos-item-${repo.name}`}
        data-testid="repo-item"
      >
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

  if (repos?.length) {
    return (
      <Item.Group divided aria-label="repos-list-data">
        {repos.map(_renderItemRepo)}
      </Item.Group>
    );
  }
  return (
    <span aria-label="repos-no-data">
      {currentUser?.login || "This user"} doesn’t have any public repositories
      yet.
    </span>
  );
};

export default ListRepo;
