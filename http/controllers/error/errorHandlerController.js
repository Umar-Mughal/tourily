const notFound = (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
};

//---- Global Error Handler ----//
/*
 * It has 4 parameters, so whenever we want to send an error, we have to call next(err) with an argument
 * then express will automatically skip all the middlewares, and call this middleware (see notFound function)
 * */
const handleError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = {
  notFound,
  handleError,
};
