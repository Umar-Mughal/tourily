const Tour = require('../models/tour.model');

// Handlers
const createTour = (req, res) => {
  res.stats(201).json({
    status: 'success',
  });
};

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
  });
};

const getTour = (req, res) => {
  res.status(200).json({
    status: 'success',
  });
};

const updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '(Updated Tour Here)',
    },
  });
};

const deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

// Middlewares
const checkBodyMiddleware = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

module.exports = {
  createTour,
  getAllTours,
  getTour,
  updateTour,
  deleteTour,
  checkBodyMiddleware,
};
