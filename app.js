// Packages
const express = require('express');
const morgan = require('morgan');
// Routers
const tourRouter = require('./routes/tour.routes');
const userRouter = require('./routes/user.routes');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(morgan('dev'));

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app