const { Router } = require("express");
const requireAuth = require("../middlewares/user.middleware");
const requireRole = require("../middlewares/role.middleware");
const schemaValidation = require("../middlewares/schemaValidation.middleware");
const { uploadMoviePoster } = require("../middlewares/upload.middleware");
const controller = require("../controllers/movie.controller");
const { createMovieSchema } = require("../validators/movie.schema");

module.exports = (app) => {
    const router = Router();

    // Públicas
    router.get("/", controller.getAllMovies);
    router.get("/search", controller.searchMovies);
    router.get("/:id", controller.getMovieDetails);

    // Protegidas (Solo Admin)
    router.post("/", requireAuth, requireRole("admin"), uploadMoviePoster, schemaValidation(createMovieSchema), controller.createMovie);

    app.use("/movies", router);
};