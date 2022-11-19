// Load Environment Variables
require('dotenv').config({
  path: `${__dirname}/env/.env.${process.env.NODE_ENV}`,
});
// Connect DataBase
require('./configs/db');
// Connect Server
require('./configs/server');
