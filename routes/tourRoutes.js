// Packages
const express = require('express');
// Controllers
const tourController = require('../http/controllers/tour/tourController');
// Validators
const tourValidator = require('../http/validators/tour/tourValidator');
// Middlewares
const tourMiddleware = require('../http/middlewares/tour/tourMiddleware');

const router = express.Router();

router
  .route('/top-5-cheap')
  .get(tourMiddleware.aliasTopTours, tourController.getAllTours);

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
