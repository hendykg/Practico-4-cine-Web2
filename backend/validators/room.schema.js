const Joi = require("joi");

const createRoomSchema = Joi.object({
    name: Joi.string().trim().required(),
    rows_count: Joi.number().integer().min(1).required(),
    columns_count: Joi.number().integer().min(1).required()
});

module.exports = { createRoomSchema };