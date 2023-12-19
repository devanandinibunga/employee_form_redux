import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./components/employeeReducer";

export default configureStore({
  reducer: {
    employeeData: employeeReducer,
  },
});
