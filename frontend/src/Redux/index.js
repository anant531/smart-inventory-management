import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./reducer";
const store = configureStore({
  reducer: {
    tokenReducer,
  },
});

export default store;
