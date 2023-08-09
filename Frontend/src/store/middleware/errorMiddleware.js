// This is middleware is used to check if action consist of error type

const errorMiddleware = (store) => (next) => (action) => {
  if (action.type === "ERROR_TASK") {
    console.log("Error is: ", action);
  } else {
    next(action); // Passing control to reducer
  }
};

export default errorMiddleware;
