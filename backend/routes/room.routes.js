const { Router } = require("express");
const requireAuth = require("../middlewares/user.middleware");
const requireRole = require("../middlewares/role.middleware");
const schemaValidation = require("../middlewares/schemaValidation.middleware");
const { isJsonRequestValid } = require("../middlewares/isJsonRequestValid.middleware");
const controller = require("../controllers/room.controller");
const { createRoomSchema } = require("../validators/room.schema");

module.exports = (app) => {
    const router = Router();

    router.post("/", requireAuth, requireRole("admin"), isJsonRequestValid, schemaValidation(createRoomSchema), controller.createRoom);
    router.get("/", requireAuth, requireRole("admin"), controller.getAllRooms);

    app.use("/rooms", router);
};