const db = require("../models");

const showtimeService = {
    createShowtime: async (payload) => {
        const movie = await db.movie.findByPk(payload.movie_id);
        if (!movie) return { error: "MOVIE_NOT_FOUND" };

        const room = await db.room.findByPk(payload.room_id);
        if (!room) return { error: "ROOM_NOT_FOUND" };

        // 1. Calcular la hora de inicio y fin de la nueva función
        const newStart = new Date(payload.datetime);
        const newEnd = new Date(newStart.getTime() + movie.duration * 60000); // Convierte minutos a milisegundos

        // 2. Buscar todas las funciones de esa sala
        const existingShowtimes = await db.showtime.findAll({
            where: { room_id: payload.room_id },
            include: [{ model: db.movie }]
        });

        // 3. Validar solapamiento matemático
        for (let st of existingShowtimes) {
            const existStart = new Date(st.datetime);
            const existEnd = new Date(existStart.getTime() + st.Movie.duration * 60000);

            // Regla: Hay choque si la nueva empieza antes de que termine la otra, y termina después de que empiece la otra.
            if (newStart < existEnd && newEnd > existStart) {
                return { error: "ROOM_ALREADY_BOOKED" };
            }
        }

        return await db.showtime.create(payload);
    }
};

module.exports = showtimeService;