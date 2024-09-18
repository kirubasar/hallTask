const express = require('express');
const bookingController = require('../controllers/bookingController');


const bookingRouter = express.Router();

bookingRouter.post('/', bookingController.booking);
bookingRouter.get('/roomsByCustomer', bookingController.listRoomsByCustomer);
bookingRouter.get('/allbookings', bookingController.getAllBookings);
bookingRouter.get('/:id', bookingController.getBooking);
bookingRouter.put('/:id', bookingController.UpdateBooking);
bookingRouter.delete('/:id', bookingController.deletebooking);

module.exports = bookingRouter;