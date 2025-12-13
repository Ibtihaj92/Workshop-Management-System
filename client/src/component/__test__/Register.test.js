import React from "react";
import Register from "../Register";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "redux-mock-store";
import reducer from "../../features/authSlice";

// mock store
const myMockStore = configureStore([]);
const myStore = myMockStore({
  auth: {
    user: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
});

// Snapshot Test
test("Match the Register UI snapshot", () => {
  const { container } = render(
    <Provider store={myStore}>
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    </Provider>
  );

  expect(container).toMatchSnapshot();
});

// Initial State Test
const myInitialState = {
  user: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

test("Auth reducer should match initial state...", () => {
  expect(reducer(undefined, { type: undefined })).toEqual(myInitialState);
});
