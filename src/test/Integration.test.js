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

const server = setupServer(
  rest.get(`${CONFIG.GITHUB_API}/search/users`, (req, res, ctx) => {
    return res(ctx.status(500));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("search user - get search result - click result - show user preview", async () => {
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
