const dbConfig = require("../config/db.config");
const { Sequelize } = require("sequelize");

const sequelize = dbConfig.sequelize;

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Inicializar modelos
db.user = require("./user.model")(sequelize);
db.movie = require("./movie.model")(sequelize);
db.room = require("./room.model")(sequelize);
db.showtime = require("./showtime.model")(sequelize);
db.reservation = require("./reservation.model")(sequelize);
db.seat = require("./seat.model")(sequelize);

// --- RELACIONES ---

// Película <-> Función
db.movie.hasMany(db.showtime, { foreignKey: "movie_id" });
db.showtime.belongsTo(db.movie, { foreignKey: "movie_id" });

// Sala <-> Función
db.room.hasMany(db.showtime, { foreignKey: "room_id" });
db.showtime.belongsTo(db.room, { foreignKey: "room_id" });

// Usuario <-> Reserva
db.user.hasMany(db.reservation, { foreignKey: "user_id" });
db.reservation.belongsTo(db.user, { foreignKey: "user_id" });

// Función <-> Reserva
db.showtime.hasMany(db.reservation, { foreignKey: "showtime_id" });
db.reservation.belongsTo(db.showtime, { foreignKey: "showtime_id" });

// Reserva <-> Asientos
db.reservation.hasMany(db.seat, { foreignKey: "reservation_id" });
db.seat.belongsTo(db.reservation, { foreignKey: "reservation_id" });

// Función <-> Asientos (Necesario para el índice único de ocupación)
db.showtime.hasMany(db.seat, { foreignKey: "showtime_id" });
db.seat.belongsTo(db.showtime, { foreignKey: "showtime_id" });

module.exports = db;