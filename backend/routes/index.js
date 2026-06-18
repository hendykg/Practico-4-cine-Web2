module.exports = app => {
    require('./auth.routes')(app);
    require('./movie.routes')(app);
    require('./room.routes')(app);
    require('./showtime.routes')(app);
    require('./reservation.routes')(app);
}