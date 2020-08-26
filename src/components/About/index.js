import React from "react";
import { Message, Segment, Header } from "semantic-ui-react";

const About = () => {
  return (
    <Segment>
      <Message>
        <Header as="h2">About searching on GitHub</Header>
        <p>
          Use our powerful search tools to find what you're looking for among
          the many users, repositories of users and organizations that he/she
          belongs to in GitHub.
        </p>
      </Message>
    </Segment>
  );
};
export default About;
