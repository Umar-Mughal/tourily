const app = require('../app');
// Start Server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port} in ${process.env.NODE_ENV} mode.`);
});

//---- Handles any unhandledRejection errors outside of express app ----//
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION, ERROR OUTSIDE EXPRESS APP:-');
  console.error(`Name: ${err.name}, Message: ${err.message}`);
  console.error('SHUTTING DOWN DUE TO UNHANDLED REJECTION !!!');
  server.close(() => {
    process.exit(1);
  });
});
