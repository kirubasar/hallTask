const Booking = require('../models/booking')
const Room = require('../models/room')
const bookingController = {
    booking: async(req, res)=>{
        try{
            const{customerName, date, startTime, endTime, roomId}=req.body;
            
            
            const newBooking = new Booking({
                room: roomId,
                customerName, 
                date, 
                startTime, 
                endTime
            })
            const savedBooking = await newBooking.save();

            const room = await Room.findById(roomId);
            if (!room) {
                return res.status(404).send({ message: 'Room not found' });
            }

            res.status(201).send({
                message: 'Booking created successfully',
                booking: {
                    customerName: savedBooking.customerName,
                    date: savedBooking.date,
                    startTime: savedBooking.startTime,
                    endTime: savedBooking.endTime,
                    roomId: savedBooking.room,
                   
                }
            });
        }catch(error){
            res.send({message: error.message})
    }
    
},
getAllBookings: async(req, res)=>{
    try{
        const bookings = await Booking.find().populate('room', 'name');;
        res.status(201).send({message:'All bookings', bookings})
    }catch(error){
        res.status(400).send({message:error.message})
    }
},
getBooking: async (req, res) => {
    try {
        
        const bookingId = req.params.id;

        
        const booking = await Booking.findById(bookingId).populate('room', 'name');

        
        res.status(200).send(booking);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
},
UpdateBooking: async(req, res)=>{
   try{
    const bookingId = req.params.id;
    
    const{customerName, status, date, startTime, endTime} = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(bookingId, {
        customerName,
        status,
        date, 
        startTime,
        endTime
    },{new: true});

    res.status(201).send({message:'booking updated successfully', booking:updatedBooking})
   } catch(error){
    res.status(400).send({message:error.message})
}
},
deletebooking: async(req, res)=>{
    try{
        
            
            const bookingId = req.params.id;

            
            const deletedBooking = await Booking.findByIdAndDelete(bookingId);

            if (!deletedBooking) {
                return res.send({ message: 'booking does not exist' });
            }

        
            res.status(200).send({ message: 'booking deleted successfully' });
    } catch(error){
        res.status(401).send({ message: error.message})
    }
   
},
listRoomsByCustomer: async (req, res) => {
    const { customerName } = req.query; 
    try {
        const roomsByCustomer = await Booking.aggregate([
            {
                $match: {
                    customerName: customerName,
                    status: 'confirmed'
                }
            },
            {
                $lookup: {
                    from: 'rooms',
                    localField: 'room',
                    foreignField: '_id',
                    as: 'roomDetails'
                }
            },
            {
                $unwind: '$roomDetails'
            },
            {
                $project: {
                    _id: 0,
                    customerName: '$customerName',
                    roomName: '$roomDetails.name',
                    date: '$date',
                    startTime: '$startTime',
                    endTime: '$endTime'
                }
            }
        ]);


        res.status(200).send(roomsByCustomer);
    } catch (error) {
        console.error('Error:', error.message); 
        res.status(500).send({ message: error.message });
    }
}

}

module.exports=bookingController;