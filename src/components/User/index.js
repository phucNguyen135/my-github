import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Item, Segment, Label } from "semantic-ui-react";

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
          <Item>
            <Item.Image size="small" src={info.avatar_url} />
            <Item.Content>
              <Item.Header>
                {[info.login, info.name].filter((_) => _).join(" - ")}
              </Item.Header>
              <Item.Meta>
                <span>{info.location}</span>
              </Item.Meta>
              <Item.Meta>
                <a href={info.html_url} target="_blank">
                  {info.html_url}
                </a>
              </Item.Meta>
              <Item.Description>{info.bio}</Item.Description>
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
