import React from "react";
import ListRepo from "../Repository";
import Organization from "../Organization";
import { Menu, Tab } from "semantic-ui-react";

const MyTab = () => {
  return (
    <Tab
      panes={[
        {
          menuItem: (
            <Menu.Item key="repositories" aria-label="tab-repos">
              Repositories
            </Menu.Item>
          ),
          render: () => (
            <Tab.Pane>
              <ListRepo />
            </Tab.Pane>
          ),
        },
        {
          menuItem: (
            <Menu.Item key="organizations" aria-label="tab-orgs">
              Organizations
            </Menu.Item>
          ),
          render: () => (
            <Tab.Pane>
              <Organization />
            </Tab.Pane>
          ),
        },
      ]}
    />
  );
};

export default MyTab;
