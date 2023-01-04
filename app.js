// Packages
const express = require('express');
// Routers
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
// Controllers
const errorHandlerController = require('./http/controllers/error/errorHandlerController');

const app = express();

//---- Middlewares ----//
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//---- Routes ----//
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.all('*', errorHandlerController.notFound);
app.use(errorHandlerController.handleErrorGlobally);

module.exports = app;
