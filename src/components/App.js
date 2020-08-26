import React, { useMemo } from "react";
import Search from "./Search";
import ListRepo from "./Repository";
import Organization from "./Organization";
import User from "./User";
import { connect } from "react-redux";
import {
  Container,
  Loader,
  Tab,
  Menu,
  Segment,
  Image,
  Header,
} from "semantic-ui-react";
import About from "./About";

const App = (props) => {
  const _renderContent = useMemo(() => {
    if (props.loading) {
      return <Loader active inline="centered" />;
    }
    return (
      <Tab
        panes={[
          {
            menuItem: "Repositories",
            render: () => (
              <Tab.Pane>
                <ListRepo />
              </Tab.Pane>
            ),
          },
          {
            menuItem: "Organizations",
            render: () => (
              <Tab.Pane>
                <Organization />
              </Tab.Pane>
            ),
          },
        ]}
      />
    );
  }, [props.loading]);
  return (
    <Container>
      <Menu pointing>
        <Menu.Item>
          <Image
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            size="tiny"
            verticalAlign="middle"
          />
          <span>
            <Header as="h2">finder</Header>
          </span>
        </Menu.Item>
        <Menu.Item position="right">
          <Menu.Item>
            <Search />
          </Menu.Item>
        </Menu.Item>
      </Menu>

      {(props.currentUser && (
        <>
          <User />
          <Segment>{_renderContent}</Segment>
        </>
      )) || <About />}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.github.isLoading,
    currentUser: state.github.currentUser,
  };
};

export default connect(mapStateToProps)(App);
