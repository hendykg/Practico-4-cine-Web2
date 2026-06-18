const db = require("../models");

const reservationService = {
    createReservation: async (userId, showtimeId, seatsArray) => {
        // Iniciamos una transacción: Si un asiento falla, se cancela toda la reserva
        const transaction = await db.sequelize.transaction();
        
        try {
            const reservation = await db.reservation.create({ 
                user_id: userId, 
                showtime_id: showtimeId 
            }, { transaction });

            for (let seat of seatsArray) {
                await db.seat.create({
                    reservation_id: reservation.id,
                    showtime_id: showtimeId, // Clave para el índice único
                    row: seat.row,
                    column: seat.column
                }, { transaction });
            }

            await transaction.commit();
            return reservation;

        } catch (error) {
            await transaction.rollback();
            // Capturamos el error del índice único de la base de datos
            if (error.name === 'SequelizeUniqueConstraintError') {
                return { error: "SEAT_ALREADY_BOOKED" };
            }
            throw error;
        }
    },
    getUserReservations: async (userId) => {
        return await db.reservation.findAll({
            where: { user_id: userId },
            include: [
                { model: db.showtime, include: [db.movie, db.room] },
                { model: db.seat }
            ]
        });
    }
};

module.exports = reservationService;