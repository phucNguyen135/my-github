import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  createEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../components/App";
import { Provider } from "react-redux";
import store from "../redux/configureStore";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { CONFIG } from "../config";
import { MOCK_API_TEST } from "./mock";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("[MOCK API]search user - get search result - click result - show user preview", async () => {
  const { USER_TEST, USERS } = MOCK_API_TEST;
  server.use(
    rest.get(`${CONFIG.GITHUB_API}/search/users`, (req, res, ctx) => {
      return res(ctx.json(USERS));
    })
  );
  const utils = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const inputElement = utils.getByLabelText("search-user");
  fireEvent.change(inputElement, { target: { value: "nguyen" } });

  const searchResultLabel = `search-user-results-${USER_TEST.login}`;
  await waitFor(() => expect(utils.getByLabelText(searchResultLabel)));
  const searchResultElement = utils.getByLabelText(searchResultLabel);
  fireEvent(searchResultElement, createEvent.click(searchResultElement));
  await waitFor(() => expect(utils.getByLabelText("user-preview")), {
    timeout: 10000,
  });
  expect(utils.getByLabelText("user-preview-img").src).toBe(
    MOCK_API_TEST.USER_TEST.avatar_url
  );
  expect(utils.getByLabelText("user-preview-header")).toHaveTextContent(
    [USER_TEST.login, USER_TEST.name].filter((_) => _).join(" - ")
  );
  expect(utils.getByLabelText("user-preview-url")).toHaveTextContent(
    USER_TEST.html_url
  );
});

test("check organization with no data", async () => {
  const utils = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const inputElement = utils.getByLabelText("search-user");
  fireEvent.change(inputElement, { target: { value: "phucNguyen135" } });

  const searchResultLabel = `search-user-results-phucNguyen135`;
  await waitFor(() => expect(utils.getByLabelText(searchResultLabel)), {
    timeout: 10000,
  });
  const searchResultElement = utils.getByLabelText(searchResultLabel);
  fireEvent(searchResultElement, createEvent.click(searchResultElement));

  await waitFor(() => expect(utils.getByLabelText("tab-orgs")), {
    timeout: 10000,
  });

  const tabOrgElm = utils.getByLabelText("tab-orgs");
  fireEvent(tabOrgElm, createEvent.click(tabOrgElm));

  expect(utils.getByLabelText("orgs-no-data")).toHaveTextContent(
    "phucNguyen135 is not a member of any organizations."
  );
});

test("check repositories with no data", async () => {
  const utils = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const inputElement = utils.getByLabelText("search-user");
  fireEvent.change(inputElement, { target: { value: "nguyenvunamphuc1" } });

  const searchResultLabel = `search-user-results-nguyenvunamphuc1`;
  await waitFor(() => expect(utils.getByLabelText(searchResultLabel)), {
    timeout: 10000,
  });
  const searchResultElement = utils.getByLabelText(searchResultLabel);
  fireEvent(searchResultElement, createEvent.click(searchResultElement));

  expect(utils.getByLabelText("repos-no-data")).toHaveTextContent(
    "nguyenvunamphuc1 doesn’t have any public repositories yet."
  );
});
