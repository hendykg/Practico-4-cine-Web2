const db = require("../models");

const roomService = {
    createRoom: async (payload) => {
        return await db.room.create(payload);
    },
    getAllRooms: async () => {
        return await db.room.findAll();
    }
};

module.exports = roomService;