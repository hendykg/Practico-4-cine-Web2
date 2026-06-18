const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Showtime = sequelize.define(
        "Showtime",
        {
            datetime: { type: DataTypes.DATE, allowNull: false },
            price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
        },
        { tableName: "showtimes" }
    );
    return Showtime;
};