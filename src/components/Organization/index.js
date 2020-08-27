import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { Card, Grid } from "semantic-ui-react";

const Organizations = () => {
  const [orgs, currentUser] = useSelector((state) => [
    state.github.organizations,
    state.github.currentUser,
  ]);

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

  if (orgs?.length) {
    return (
      <>
        <Grid relaxed="very" columns={4}>
          {orgs.map(_renderItem)}
        </Grid>
      </>
    );
  }
  return (
    <span aria-label="orgs-no-data">
      {currentUser?.login || "This user"} is not a member of any organizations.
    </span>
  );
};

export default Organizations;
