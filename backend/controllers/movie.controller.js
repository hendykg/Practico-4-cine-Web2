const movieService = require("../services/movie.service");

exports.createMovie = async (req, res) => {
    const movie = await movieService.createMovie(req.body, req.file);
    res.status(201).json(movie);
};

exports.getAllMovies = async (req, res) => {
    const movies = await movieService.getAllMovies(req.query.genre);
    res.status(200).json(movies);
};

exports.searchMovies = async (req, res) => {
    const movies = await movieService.searchMovies(req.query.q || "");
    res.status(200).json(movies);
};

exports.getMovieDetails = async (req, res) => {
    const movie = await movieService.getMovieById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Película no encontrada" });
    res.status(200).json(movie);
};