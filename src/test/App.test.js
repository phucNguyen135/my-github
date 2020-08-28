import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../components/index";

test("input search exist", () => {
  const utils = render(<App />);
  expect(utils.getByLabelText("search-user"));
});

test("search value input", () => {
  const utils = render(<App />);
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
  const utils = render(<App />);
  // Type phucNguyen135 in input search
  const inputElement = utils.getByLabelText("search-user");
  fireEvent.change(inputElement, { target: { value: "phucNguyen135" } });

  // Check have user phucNguyen135 in search result.
  await waitFor(
    () => expect(utils.getByLabelText("search-user-results-phucNguyen135")),
    { timeout: 10000 }
  );
});
