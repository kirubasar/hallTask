const mongoose = require('mongoose')


const bookingSchema = new mongoose.Schema({
    room:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Room'
    },
    customerName: String,
    date: Date,
    startTime: String,
    endTime: String,
    createdAt:{
        type: Date,
        default:Date.now
    },
    status:{
        type:String,
        default:'confirmed'
    }
});

// export the model
module.exports = mongoose.model('Booking', bookingSchema, 'bookings');