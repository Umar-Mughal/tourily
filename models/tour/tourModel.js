// Packages
const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: [true, 'Tour name should be unique'],
      trim: true,
      maxLength: [40, 'A tour must have less or equal then 40 characters'],
      minLength: [10, 'A tour must have more or equal then 10 characters'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium or difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below or equal to 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price.'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        // We can also use validate in array [function, message] shape
        validator: function (val) {
          // "this" only points to current doc on new document creation, won't be available in update
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below the regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary.'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image.'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//------ VIRTUAL PROPERTIES (These properties are not part of the actual DB schema) ------//
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

//------ DOCUMENT MIDDLEWARES ------//
// Runs before .save() and .create(), but not for .insertMany()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
// Runs After .save() and .create()
tourSchema.post('save', (doc, next) => {
  // this is just a regular function, linter made it an arrow one, please change it to regular function to get "this"
  next();
});

//------ QUERY MIDDLEWARES (This keyword now will point current query not document) ------//
// This /^find/ RE will trigger this function for all the queries contain word "find".
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});
tourSchema.post(/^find/, (docs, next) => {
  next();
});

//------ Aggregation MIDDLEWARES (Here "this" will point to an aggregation object) ------//
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
