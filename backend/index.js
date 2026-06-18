const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const db = require('./models');
require('dotenv').config();

// Configuración de CORS para permitir al frontend de React (Vite)
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true // Permite el envío de cookies (JWT)
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Exponer la carpeta uploads para que las imágenes de los pósters del cine sean públicas
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Cargar todas las rutas del cine (auth, movies, rooms, showtimes, reservations)
require("./routes")(app);

// Sincronizar Sequelize con la Base de Datos SQLite
db.sequelize.sync({
    // force: true // Descomenta esto solo si necesitas borrar todas las tablas y recrearlas
}).then(() => {
    console.log("Base de datos sincronizada correctamente.");
});

app.listen(port, () => {
    console.log(`API del Cine escuchando en el puerto ${port}`);
});