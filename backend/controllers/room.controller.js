const roomService = require("../services/room.service");

exports.createRoom = async (req, res) => {
    const room = await roomService.createRoom(req.body);
    res.status(201).json(room);
};

exports.getAllRooms = async (req, res) => {
    const rooms = await roomService.getAllRooms();
    res.status(200).json(rooms);
};