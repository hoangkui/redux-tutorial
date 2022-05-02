import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./reducers/todosSlice";
// Store
const store = configureStore({
  reducer: {
    todosReducer,
  },
});
export default store;
