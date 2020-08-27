import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  createEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./components/App";
import Search from "./components/Search";
import { Provider } from "react-redux";
import store from "./redux/configureStore";
import {
  actionUserSearch,
  actionOrganizationSearch,
  actionRepoSearch,
  actionSetCurrentUser,
} from "./redux/actions/github";
import SearchResultItem from "./components/Search/SearchResultItem";

jest.mock("./redux/actions/github");
test("search value input", () => {
  const utils = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const inputElement = utils.getByLabelText("search-user");
  fireEvent.change(inputElement, { target: { value: "phucNGuyen" } });
  expect(inputElement.value).toBe("phucNGuyen");
  fireEvent.change(inputElement, { target: { value: "" } });
  expect(inputElement.value).toBe("");
  fireEvent.change(inputElement, { target: { value: "nam" } });
  fireEvent.change(inputElement, { target: { value: "nguyen" } });
  expect(inputElement.value).toBe("nguyen");
});

test("call action user search when input change", async () => {
  const utils = render(
    <Provider store={store}>
      <Search />
    </Provider>
  );
  const inputElement = utils.getByLabelText("search-user");
  fireEvent.change(inputElement, { target: { value: "nguyen" } });
  await waitFor(() => expect(actionUserSearch).toHaveBeenCalledTimes(1), {
    timeout: 1000,
  });
});

test("call api search repos, orgs after click search result", async () => {
  const utils = render(
    <SearchResultItem item={{ id: 70199220, login: "phucNguyen135" }} />
  );
  const element = utils.getByLabelText("search-user-results");
  fireEvent(element, createEvent.click(element));
  await waitFor(() =>
    expect(actionOrganizationSearch).toHaveBeenCalledTimes(1)
  );
  await waitFor(() => expect(actionRepoSearch).toHaveBeenCalledTimes(1));
  await waitFor(() => expect(actionSetCurrentUser).toHaveBeenCalledTimes(1));
});
