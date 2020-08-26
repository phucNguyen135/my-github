import React, { useCallback } from "react";
import { connect } from "react-redux";
import { Card, Header, Grid } from "semantic-ui-react";

const ListRepo = (props) => {
  const _handleClick = useCallback(
    (link) => async () => {
      const res = await fetch(link);
      const resJSON = await res.json();
      window.open(resJSON.html_url, "_blank");
    },
    []
  );

  const _renderItem = useCallback(
    (org) => (
      <Grid.Column key={org.id}>
        <Card
          onClick={_handleClick(org.url)}
          image={org.avatar_url}
          header={org.login}
          meta={org.url}
          description={org.description}
        />
      </Grid.Column>
    ),
    []
  );

  if (props.orgs?.length) {
    return (
      <>
        <Header as="h1">Organizations</Header>
        <Grid relaxed="very" columns={4}>
          {props.orgs.map(_renderItem)}
        </Grid>
      </>
    );
  }
  return (
    <span>
      {props.currentUser?.login || "This user"} is not a member of any
      organizations.
    </span>
  );
};
const mapStateToProps = (state) => {
  return {
    orgs: state.github.organizations,
    currentUser: state.github.currentUser,
  };
};

export default connect(mapStateToProps)(ListRepo);
