import { createAsyncThunk } from "@reduxjs/toolkit";

export const setToken = createAsyncThunk("SET_TOKEN", async (token) => {
  localStorage.setItem("token", token);
  return token;
});
export const clearToken = createAsyncThunk("CLEAR_TOKEN", async () => {
  localStorage.removeItem("token");
  return null;
});
