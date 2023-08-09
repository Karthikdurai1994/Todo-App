// logger middleware is a function that is used to log "redux actions". Here log means just printing the "action" in the console

// Applying currying
const loggerMiddleware = (store) => (next) => (action) => {
  //console.log(action);
  return next(action);
};

export default loggerMiddleware;
