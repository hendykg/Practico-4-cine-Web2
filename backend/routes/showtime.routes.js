const { Router } = require("express");
const requireAuth = require("../middlewares/user.middleware");
const requireRole = require("../middlewares/role.middleware");
const schemaValidation = require("../middlewares/schemaValidation.middleware");
const { isJsonRequestValid } = require("../middlewares/isJsonRequestValid.middleware");
const controller = require("../controllers/showtime.controller");
const { createShowtimeSchema } = require("../validators/showtime.schema");

module.exports = (app) => {
    const router = Router();

    router.post("/", requireAuth, requireRole("admin"), isJsonRequestValid, schemaValidation(createShowtimeSchema), controller.createShowtime);

    app.use("/showtimes", router);
};