// Utils
const AppError = require('../../base/AppError');
// Configs
const { DEV, PROD } = require('../../../configs/constants');

//---- Route Not Found Error ----//
const notFound = (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
};

//---- DB Errors ----//
const handleCastErrorDB = (err) =>
  new AppError(`Invalid ${err.path}: ${err.value}.`, 400);
const handleDuplicateFieldsErrorDB = (err) =>
  new AppError(`Duplicate field value: x. Please use another value.`, 400);
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  return new AppError(`Invalid Input Data:- ${errors.join('. ')}`, 400);
};

//---- Making Error Object For Production ----//
const getProductionErrorObj = (err) => {
  if (err.name === 'CastError') return handleCastErrorDB(err);
  if (err.code === 11000) return handleDuplicateFieldsErrorDB(err);
  if (err.name === 'ValidationError') return handleValidationErrorDB(err);
  return err;
};

//---- Shows any kind of error in detail ----//
const sendErrorToDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

//---- Shows minimal details about errors ----//
const sendErrorToProd = (err, res) => {
  /* Operational errors are Trusted Errors: Means, all those errors we have handled ourselves, can only be sent to production. No other unexpected/unknown errors, like programming errors (a Programmer does), or any 3rd party package error, will be leaked to production. */
  if (err.isOperationl) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } /* Programming or Unknown Errors */ else {
    console.error(`Error in production: ${JSON.stringify(err)}`);
    res.status(500).json({
      status: 'error',
      message: 'Server Error!!!',
    });
  }
};

//---- Error-handling Middleware  ----//
/* This is a special middleware function which has 4 parameters, so whenever we want to send an error, we have to call next(err) with an error argument then express will automatically skip all the middlewares, and call this middleware (see notFound function) */
const handleErrorGlobally = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === DEV) {
    sendErrorToDev(err, res);
  } else if (process.env.NODE_ENV === PROD)
    sendErrorToProd(getProductionErrorObj(err), res);
};

module.exports = {
  notFound,
  handleErrorGlobally,
};
