// Packages
const express = require('express');
// Controllers
const tourController = require('../controllers/tour.controller');
// Validators
const tourValidator = require('../validators/tour.validator');

const router = express.Router();

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourValidator.createTourValidator, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
