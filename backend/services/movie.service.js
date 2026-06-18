const { Op } = require("sequelize");
const db = require("../models");

const movieService = {
    createMovie: async (payload, file) => {
        const posterUrl = file ? `/uploads/posters/${file.filename}` : null;
        return await db.movie.create({ ...payload, poster_image: posterUrl });
    },
    getAllMovies: async (genre) => {
        const where = genre ? { genre } : {};
        return await db.movie.findAll({ where });
    },
    searchMovies: async (query) => {
        return await db.movie.findAll({
            where: { title: { [Op.like]: `%${query}%` } }
        });
    },
    getMovieById: async (id) => {
        return await db.movie.findByPk(id, {
            include: [{ model: db.showtime }] // Trae las funciones disponibles
        });
    }
};

module.exports = movieService;