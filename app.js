// Packages
const express = require('express');
const morgan = require('morgan');
// Routers
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
// Controllers
const errorHandlerController = require('./http/controllers/error/errorHandlerController');

const app = express();

//---- Middlewares ----//
if (process.env.NODE_ENV === 'dev') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//---- Routes ----//
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.all('*', errorHandlerController.notFound);
app.use(errorHandlerController.handleError);

module.exports = app;
