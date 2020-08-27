import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../components/App";
import { Provider } from "react-redux";
import store from "../redux/configureStore";

test("input search exist", () => {
  const utils = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(utils.getByLabelText("search-user"));
});

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

test("search user phucNguyen123", async () => {
  const utils = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  // Type phucNguyen135 in input search
  const inputElement = utils.getByLabelText("search-user");
  fireEvent.change(inputElement, { target: { value: "phucNguyen135" } });

  // Check have user phucNguyen135 in search result.
  await waitFor(
    () => expect(utils.getByLabelText("search-user-results-phucNguyen135")),
    { timeout: 10000 }
  );
});
