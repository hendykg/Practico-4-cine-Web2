const reservationService = require("../services/reservation.service");

exports.createReservation = async (req, res) => {
    const { showtime_id, seats } = req.body;
    const result = await reservationService.createReservation(req.user.id, showtime_id, seats);

    if (result.error === "SEAT_ALREADY_BOOKED") {
        return res.status(409).json({ message: "Uno o más asientos ya fueron reservados por otro usuario" });
    }

    res.status(201).json(result);
};

exports.getMyReservations = async (req, res) => {
    const reservations = await reservationService.getUserReservations(req.user.id);
    res.status(200).json(reservations);
};