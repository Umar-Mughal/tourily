const AppError = require('../../base/AppError');

const notFound = (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
};

//---- Global Error Handler ----//
/*
 * It has 4 parameters, so whenever we want to send an error, we have to call next(err) with an argument
 * then express will automatically skip all the middlewares, and call this middleware (see notFound function)
 * */
const handleErrorGlobally = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = {
  notFound,
  handleErrorGlobally,
};
