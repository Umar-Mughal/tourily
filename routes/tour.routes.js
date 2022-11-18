// Packages
const express = require('express');
// Controllers
const tourController = require('../controllers/tour.controller');

const router = express.Router();

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBodyMiddleware, tourController.createTour);

router
  .route('/:id')
  .all(tourController.checkIDMiddleware)
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
