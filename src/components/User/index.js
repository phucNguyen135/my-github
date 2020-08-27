import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Item, Segment, Label, Search } from "semantic-ui-react";

const SearchUser = (props) => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (props.user?.url) {
        const res = await fetch(props.user.url);
        const resJSON = await res.json();
        setInfo(resJSON);
      }
    };
    fetchUserInfo();
  }, [props.user]);

  const _renderExtraData = useCallback(
    ({ name, value }) => (
      <Label>
        {name}: {value}
      </Label>
    ),
    []
  );

  if (info) {
    const extraData = [
      {
        name: "Public repos",
        value: info.public_repos,
      },
      {
        name: "Followers",
        value: info.followers,
      },
      {
        name: "Following",
        value: info.following,
      },
    ];
    return (
      <Segment>
        <Item.Group>
          <Item aria-label="user-preview">
            <Item.Image
              size="small"
              src={info.avatar_url}
              aria-label="user-preview-img"
            />
            <Item.Content>
              <Item.Header aria-label="user-preview-header">
                {[info.login, info.name].filter((_) => _).join(" - ")}
              </Item.Header>
              <Item.Meta>
                <span aria-label="user-preview-location">{info.location}</span>
              </Item.Meta>
              <Item.Meta>
                <a
                  href={info.html_url}
                  target="_blank"
                  aria-label="user-preview-url"
                >
                  {info.html_url}
                </a>
              </Item.Meta>
              <Item.Description aria-label="user-preview-bio">
                {info.bio}
              </Item.Description>
              <Item.Extra>{extraData.map(_renderExtraData)}</Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    );
  }
  return null;
};
const mapStateToProps = (state) => {
  return {
    user: state.github.currentUser,
  };
};

export default connect(mapStateToProps)(SearchUser);
