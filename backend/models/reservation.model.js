const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Reservation = sequelize.define(
        "Reservation",
        {
            status: { 
                type: DataTypes.STRING, 
                allowNull: false, 
                defaultValue: "confirmed" 
            }
        },
        { tableName: "reservations" }
    );
    return Reservation;
};