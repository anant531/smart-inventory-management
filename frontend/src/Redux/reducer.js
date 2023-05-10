import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  role: null,
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
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setToken, setRole } = tokenSlice.actions;
const tokenReducer = tokenSlice.reducer;
export default tokenReducer;
