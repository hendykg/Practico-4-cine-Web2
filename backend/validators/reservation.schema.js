const Joi = require("joi");

const createReservationSchema = Joi.object({
    showtime_id: Joi.number().integer().positive().required(),
    seats: Joi.array().items(
        Joi.object({
            row: Joi.string().trim().required(),
            column: Joi.number().integer().positive().required()
        })
    ).min(1).required() // Obliga a enviar al menos un asiento
});

module.exports = { createReservationSchema };