// Packages
const express = require('express');
const morgan = require('morgan');
// Routers
const tourRouter = require('./routes/tour.routes');
const userRouter = require('./routes/user.routes');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app