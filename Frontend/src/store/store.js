// Creating store for redux toolkit

import { configureStore } from "@reduxjs/toolkit";
import taskReducerFun from "./tasks/taskReducer";
import employeeReducer from "./employees/employeeReducer";
import loggerMiddleware from "./middleware/loggerMiddleware";
import errorMiddleware from "./middleware/errorMiddleware";

// Here reducer function is passed to redux toolkit configureStore. And redux browser dev tools and redux thunk middleware [which is used for performing asynchronous operation] comes automatically with "redux toolkit configureStore"
const store = configureStore({
  reducer: {
    // Here we are combining multiple reducers
    tasks: taskReducerFun,
    employees: employeeReducer,
  },
  // using middlewares
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    loggerMiddleware,
    errorMiddleware,
  ], // Applying both inbuilt middlewares and custom middlewares
});

export default store;
