const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const User = sequelize.define(
        "User",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "cliente", 
                validate: {
                    isIn: [["admin", "cliente"]] // Solo permitimos estos dos roles
                }
            }
        },
        {
            tableName: "users"
        }
    );
    return User;
}