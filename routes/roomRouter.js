const express = require('express');

const roomController = require('../controllers/roomController');

const roomRouter = express.Router();

roomRouter.post('/', roomController.createRoom);
roomRouter.get('/bookedRooms', roomController.listBookedRooms);
roomRouter.get('/allrooms', roomController.getAllRooms);
roomRouter.get('/:id', roomController.getRoom);
roomRouter.put('/:id', roomController.UpdateRoom);
roomRouter.delete('/:id', roomController.deleteRoom);

module.exports = roomRouter;