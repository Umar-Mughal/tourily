const app = require('../app');
// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port} in ${process.env.NODE_ENV} mode.`);
});
