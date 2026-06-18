const showtimeService = require("../services/showtime.service");

exports.createShowtime = async (req, res) => {
    const result = await showtimeService.createShowtime(req.body);
    
    if (result.error === "MOVIE_NOT_FOUND") return res.status(404).json({ message: "Película no existe" });
    if (result.error === "ROOM_NOT_FOUND") return res.status(404).json({ message: "Sala no existe" });
    if (result.error === "ROOM_ALREADY_BOOKED") return res.status(400).json({ message: "La sala ya está ocupada en ese horario" });

    res.status(201).json(result);
};