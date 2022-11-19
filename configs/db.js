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
