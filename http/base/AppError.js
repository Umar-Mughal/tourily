class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperationl = true; // an indicator that error is created by ourselves
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
