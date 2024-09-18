const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    name: String,
    numberOfSeats: Number,
    amenities:[String],
    pricePerHour: Number
})

// export the model
module.exports = mongoose.model('Room', roomSchema, 'rooms')