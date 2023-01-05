//---- Handles any uncaughtException errors outside of express app ----//
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION, ERROR OUTSIDE EXPRESS APP:-');
  console.error(`Name: ${err.name}, Message: ${err.message}`);
  console.error('SHUTTING DOWN DUE TO UNCAUGHT EXCEPTION !!!');
  process.exit(1);
});
