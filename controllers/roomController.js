// import the model
const Room = require('../models/room');
const Booking = require('../models/booking')
const roomController ={
    createRoom: async(req, res)=>{
        const room = new Room(req.body);
        const createdRoom = await room.save();
        res.send(createdRoom)
},
getAllRooms: async(req, res)=>{
    try{
        const rooms = await Room.find()
        res.status(201).send({message:'All rooms', rooms})
    }catch(error){
        res.status(400).send({message:error.message})
    }
},
getRoom: async (req, res) => {
    try {
        
        const roomId = req.params.id;

        
        const room = await Room.findById(roomId)

        
        res.status(200).send(room);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
},
UpdateRoom: async(req, res)=>{
   try{
    const roomId = req.params.id;
    
    const{name, numberOfSeats, amenities, pricePerHour} = req.body;

    const updatedRoom = await Room.findByIdAndUpdate(roomId, {
        name, 
        numberOfSeats, 
        amenities, 
        pricePerHour
    },{new: true});

    res.status(201).send({message:'room updated successfully', room:updatedRoom})
   } catch(error){
    res.status(400).send({message:error.message})
}
},
deleteRoom: async(req, res)=>{
    try{
         const roomId = req.params.id;
         const deletedRoom = await Room.findByIdAndDelete(roomId);
         if (!deletedRoom) {
                return res.send({ message: 'booking does not exist' });
            }

        res.status(200).send({ message: 'booking deleted successfully' });
    } catch(error){
        res.status(401).send({ message: error.message})
    }
   
},
listBookedRooms: async (req, res) => {
    try {
        const bookedRooms = await Booking.aggregate([
            {
                $match: { status: 'confirmed' } 
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
                    roomName: '$roomDetails.name',
                    bookedStatus: '$status',
                    customerName: '$customerName',
                    date: '$date',
                    startTime: '$startTime',
                    endTime: '$endTime'
                }
            }
        ]);

        res.status(200).json(bookedRooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
}

module.exports = roomController;