const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Movie = sequelize.define(
        "Movie",
        {
            title: { type: DataTypes.STRING, allowNull: false },
            synopsis: { type: DataTypes.TEXT, allowNull: false },
            genre: { type: DataTypes.STRING, allowNull: false },
            duration: { type: DataTypes.INTEGER, allowNull: false }, // En minutos
            classification: { 
                type: DataTypes.STRING, 
                allowNull: false,
                validate: { isIn: [["+14", "R", "Todo público"]] }
            },
            poster_image: { type: DataTypes.STRING, allowNull: true }
        },
        { tableName: "movies" }
    );
    return Movie;
};