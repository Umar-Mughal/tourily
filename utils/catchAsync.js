/*
 * We removed try/catch blocks in all the controllers, and simply called async function, and attach .catch to every async call, because if there is an error in async function, .catch block will trigger automatically, and forward the error to our global error handler (handleErrorGlobally).
 * */
const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next); // .catch(next) is equal to .catch(err = next(err))
};

module.exports = catchAsync;
