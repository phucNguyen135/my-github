import React, { useMemo } from "react";
import Search from "./Search";
import User from "./User";
import { useSelector } from "react-redux";
import {
  Container,
  Header,
  Image,
  Loader,
  Menu,
  Segment,
} from "semantic-ui-react";
import About from "./About";
import MyModal from "./Modal";
import MyTab from "./Tab";

const App = () => {
  const [loading, currentUser] = useSelector((state) => [
    state.github.isLoading,
    state.github.currentUser,
  ]);

  const _renderContent = useMemo(() => {
    if (loading) {
      return <Loader active inline="centered" />;
    }
    return <MyTab />;
  }, [loading]);
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

      {(currentUser && (
        <>
          <User />
          <Segment>{_renderContent}</Segment>
        </>
      )) ||
        null}
      <About />
      <MyModal />
    </Container>
  );
};

export default App;
