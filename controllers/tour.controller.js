// Models
const Tour = require('../models/tour.model');

const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent.',
    });
  }
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

module.exports = {
  createTour,
  getAllTours,
  getTour,
  updateTour,
  deleteTour,
};
