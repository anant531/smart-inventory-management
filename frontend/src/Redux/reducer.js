import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  loading: false,
  error: null,
};

const tokenSlice = createSlice({
  name: "tokenSlice",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;
const tokenReducer = tokenSlice.reducer;
export default tokenReducer;
