import React from "react";
import Login from "../Login";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "redux-mock-store";
import reducer from "../../features/authSlice";

// mock store
const myMockStore = configureStore([]);
const store = myMockStore({
  auth: {
    user: null,
    isLoggedIn: false,
    status: "idle",
    error: null,
  },
});

// Snapshot Test
test("Match the Login UI snapshot...", () => {
  const { container } = render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );

  //screen.debug(container); // optional: shows HTML in console
  expect(container).toMatchSnapshot();
});

// Initial State Test
const myInitialState = {
  user: null,
  isLoggedIn: false,
  status: "idle",
  error: null,
};

test("Auth reducer should match initial state...", () => {
  expect(reducer(undefined, { type: undefined })).toEqual(myInitialState);
});
