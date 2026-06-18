const { Router } = require("express");
const requireAuth = require("../middlewares/user.middleware");
const requireRole = require("../middlewares/role.middleware");
const schemaValidation = require("../middlewares/schemaValidation.middleware");
const { isJsonRequestValid } = require("../middlewares/isJsonRequestValid.middleware");
const controller = require("../controllers/reservation.controller");
const { createReservationSchema } = require("../validators/reservation.schema");

module.exports = (app) => {
    const router = Router();

    router.post("/", requireAuth, requireRole("cliente"), isJsonRequestValid, schemaValidation(createReservationSchema), controller.createReservation);
    router.get("/my-reservations", requireAuth, requireRole("cliente"), controller.getMyReservations);

    app.use("/reservations", router);
};