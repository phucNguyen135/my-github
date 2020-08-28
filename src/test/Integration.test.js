import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  createEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../components/index";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { CONFIG } from "../config";
import { MOCK_API_TEST } from "./mock";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("[MOCK API]search user - get search result - click result - show user preview", async () => {
  const user = "nguyen";
  const { USER_TEST, USERS } = MOCK_API_TEST;
  server.use(
    rest.get(`${CONFIG.GITHUB_API}/search/users`, (req, res, ctx) => {
      return res(ctx.json(USERS));
    })
  );
  const utils = render(<App />);

  // Search user
  const inputElement = utils.getByLabelText("search-user");
  fireEvent.change(inputElement, { target: { value: user } });

  // Select user
  const searchResultLabel = `search-user-results-${USER_TEST.login}`;
  await waitFor(() => expect(utils.getByLabelText(searchResultLabel)));
  const searchResultElement = utils.getByLabelText(searchResultLabel);
  fireEvent(searchResultElement, createEvent.click(searchResultElement));

  // Check user info
  await waitFor(() => expect(utils.getByLabelText("user-preview")), OPTION);
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

test("[MOCK API] check show modal when api limit", async () => {
  const user = "nguyen";
  const { USER_TEST, USERS, RES_LIMIT } = MOCK_API_TEST;
  server.use(
    rest.get(`${CONFIG.GITHUB_API}/search/users`, (req, res, ctx) => {
      return res(ctx.json(USERS));
    }),
    rest.get(`${CONFIG.GITHUB_API}/users/${user}/orgs`, (req, res, ctx) => {
      return res(ctx.status(403), ctx.json(RES_LIMIT));
    })
  );
  const utils = render(<App />);

  // Search user
  const inputElement = utils.getByLabelText("search-user");
  fireEvent.change(inputElement, { target: { value: user } });

  // Select user
  const searchResultLabel = `search-user-results-${USER_TEST.login}`;
  await waitFor(() => expect(utils.getByLabelText(searchResultLabel)));
  const searchResultElement = utils.getByLabelText(searchResultLabel);
  fireEvent(searchResultElement, createEvent.click(searchResultElement));

  // Check modal show error is open
  await waitFor(() => expect(utils.getByLabelText("modal")), OPTION);
  expect(utils.getByLabelText("modal-header")).toHaveTextContent("Error");
  expect(utils.getByLabelText("modal-message")).toHaveTextContent(
    RES_LIMIT.message
  );

  // Click Ok to close modal
  const btnOk = "modal-button";
  await waitFor(() => expect(utils.getByLabelText(btnOk)));
  const btnElement = utils.getByLabelText(btnOk);
  fireEvent(btnElement, createEvent.click(btnElement));

  // Check modal is close
  expect(utils.queryByLabelText("modal")).toBeFalsy();
});

test("check organization with no data", async () => {
  const user = "phucNguyen135";
  const utils = render(<App />);
  // Search user
  const inputElement = utils.getByLabelText("search-user");
  fireEvent.change(inputElement, { target: { value: user } });

  // Select user
  const searchResultLabel = `search-user-results-${user}`;
  await waitFor(() => expect(utils.getByLabelText(searchResultLabel)), OPTION);
  const searchResultElement = utils.getByLabelText(searchResultLabel);
  fireEvent(searchResultElement, createEvent.click(searchResultElement));

  // Check tab orgs
  await waitFor(() => expect(utils.getByLabelText("tab-orgs")), OPTION);
  const tabOrgElm = utils.getByLabelText("tab-orgs");
  fireEvent(tabOrgElm, createEvent.click(tabOrgElm));
  expect(utils.getByLabelText("orgs-no-data")).toHaveTextContent(
    `${user} is not a member of any organizations.`
  );
});

test("check repositories with data", async () => {
  const user = "phucNguyen135";
  const utils = render(<App />);

  // Search user
  const inputElement = utils.getByLabelText("search-user");
  fireEvent.change(inputElement, { target: { value: user } });

  // Select user
  const searchResultLabel = `search-user-results-${user}`;
  await waitFor(() => expect(utils.getByLabelText(searchResultLabel)), OPTION);
  const searchResultElement = utils.getByLabelText(searchResultLabel);
  fireEvent(searchResultElement, createEvent.click(searchResultElement));

  // Check tab Repos
  await waitFor(() => expect(utils.getByLabelText("tab-repos")), OPTION);
  expect(utils.getByLabelText("repos-list-data"));
  expect(utils.getByLabelText("repos-item-my-github"));
});

const OPTION = {
  timeout: 10000,
};
