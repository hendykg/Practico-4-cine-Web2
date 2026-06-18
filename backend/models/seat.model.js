const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Seat = sequelize.define(
        "Seat",
        {
            row: { type: DataTypes.STRING, allowNull: false },
            column: { type: DataTypes.INTEGER, allowNull: false }
        },
        {
            tableName: "seats",
            indexes: [
                {
                    unique: true,
                    fields: ["showtime_id", "row", "column"] // Bloquea la doble reserva en la BD
                }
            ]
        }
    );
    return Seat;
};