import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ------------------- THUNKS -------------------

// Login user thunk
export const loginUserThunk = createAsyncThunk(
  "auth/loginUserThunk",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:5000/login", userData);
      return response.data; // user object returned from backend
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Register user thunk
export const registerUserThunk = createAsyncThunk(
  "auth/registerUserThunk",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:5000/register", userData);
      return response.data; // user object returned from backend
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// ------------------- SLICE -------------------

const initialState = {
  user: null,
  isLoggedIn: false,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.status = "succeeded";
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Login failed";
      });

    // REGISTER
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.status = "succeeded";
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Registration failed";
      });
  },
});

// Export actions
export const { logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
