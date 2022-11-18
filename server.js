// Packages
require('dotenv').config({path: `${__dirname}/env/.env.${process.env.NODE_ENV}`})
// App
const app = require('./app')

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port} ...`)
})