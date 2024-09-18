// import the express
const express = require('express');
const roomRouter = require('./routes/roomRouter');

const bookingRouter = require('./routes/bookingRouter');


// create an express app
const app = express();

app.use(express.json());
// room routes
app.use('/rooms', roomRouter);

// booking routes
app.use('/bookings', bookingRouter)

//export the app
module.exports = app;