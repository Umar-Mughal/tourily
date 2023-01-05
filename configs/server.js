const app = require('../app');
// Start Server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port} in ${process.env.NODE_ENV} mode.`);
});

//---- Handles any errors outside of express app ----//
process.on('unhandledRejection', (err) => {
  console.error(
    `ERROR OUTSIDE EXPRESS APP:- Name: ${err.name} --- Message: ${err.message}`
  );
  console.error(`UNHANDLED REJECTION, SHUTTING DOWN !!!`);
  server.close(() => {
    process.exit(1);
  });
});
