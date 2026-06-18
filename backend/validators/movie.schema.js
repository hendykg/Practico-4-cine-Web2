const Joi = require("joi");

const createMovieSchema = Joi.object({
    title: Joi.string().trim().min(1).max(150).required(),
    synopsis: Joi.string().trim().min(10).required(),
    genre: Joi.string().trim().required(),
    duration: Joi.number().integer().positive().required(), // Duración en minutos
    classification: Joi.string().valid('+14', 'R', 'Todo público').required()
});

module.exports = { createMovieSchema };