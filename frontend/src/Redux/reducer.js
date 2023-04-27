import { createSlice } from "@reduxjs/toolkit";
import { setToken, clearToken } from "./action";

const initialState = {
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(setToken.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload;
    });
    builder.addCase(setToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(clearToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(clearToken.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload;
    });
    builder.addCase(clearToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

const tokenReducer = tokenSlice.reducer;
export default tokenReducer;
