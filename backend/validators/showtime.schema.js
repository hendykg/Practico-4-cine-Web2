const Joi = require("joi");

const createShowtimeSchema = Joi.object({
    movie_id: Joi.number().integer().positive().required(),
    room_id: Joi.number().integer().positive().required(),
    datetime: Joi.date().iso().required(),
    price: Joi.number().positive().required()
});

module.exports = { createShowtimeSchema };