const AppError = require('../../base/AppError');

const notFound = (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
};

const sendErrorToDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorToProd = (err, res) => {
  // Operational errors are Trusted Errors: Means, all those errors we have handled ourselves, can only be sent to production. No other unexpected/unknown errors, like programming errors (a Programmer does), or any 3rd party package error, will be leaked to production.
  if (err.isOperationl) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } // Programming or Unknown Errors:
  else {
    console.error(`Error: ${err}`);
    res.status(500).json({
      status: 'error',
      message: 'Server Error!!!',
    });
  }
};

//---- Global Error Handler ----//
/*
 * It has 4 parameters, so whenever we want to send an error, we have to call next(err) with an argument
 * then express will automatically skip all the middlewares, and call this middleware (see notFound function)
 * */
const handleErrorGlobally = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'dev') {
    sendErrorToDev(err, res);
  } else if (process.env.NODE_ENV === 'prod') {
    sendErrorToProd(err, res);
  }
};

module.exports = {
  notFound,
  handleErrorGlobally,
};
