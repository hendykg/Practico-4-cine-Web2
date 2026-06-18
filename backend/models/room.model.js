const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Room = sequelize.define(
        "Room",
        {
            name: { type: DataTypes.STRING, allowNull: false },
            rows_count: { type: DataTypes.INTEGER, allowNull: false },
            columns_count: { type: DataTypes.INTEGER, allowNull: false }
        },
        { tableName: "rooms" }
    );
    return Room;
};