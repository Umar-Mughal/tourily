const { DEV } = require('../configs/constants');

require('dotenv').config({
  path: `${__dirname}/.env.${
    !process.env.NODE_ENV || process.env.NODE_ENV === DEV ? 'dev' : 'prod'
  }`,
});
