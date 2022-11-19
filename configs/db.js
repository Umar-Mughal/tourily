const mongoose = require('mongoose');

const Db = process.env.DATABASE_URL.replace(
  '<DATABASE_USERNAME>',
  process.env.DATABASE_USERNAME
)
  .replace('<DATABASE_PASSWORD>', process.env.DATABASE_PASSWORD)
  .replace('<DATABASE_NAME>', process.env.DATABASE_NAME);

mongoose
  .connect(Db)
  .then(() => console.log(`DB connection successful!!!`))
  .catch((err) => console.log(`DB connection failed!!!`));

const tourSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name.'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);
