import React from "react";
import AddCourse from "../AddCourse";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "redux-mock-store";
import courseReducer from "../../features/courseSlice"; // create a slice for courses if needed

// mock store
const myMockStore = configureStore([]);
const myStore = myMockStore({
  courses: {
    courses: [],
    currentCourse: null,
    loading: false,
    error: null
  },
  auth: {
    user: { email: "test@example.com" }
  }
});

// Snapshot Test 
test("Match the AddCourse UI snapshot...", () => {
  const { container } = render(
    <Provider store={myStore}>
      <BrowserRouter>
        <AddCourse />
      </BrowserRouter>
    </Provider>
  );

  expect(container).toMatchSnapshot();
});

// Initial State Test 
const myInitialState = {
  courses: [],
  currentCourse: null,
  loading: false,
  error: null
};

test("To match the initial state...", () => {
  expect(courseReducer(undefined, { type: undefined })).toEqual(myInitialState);
});

