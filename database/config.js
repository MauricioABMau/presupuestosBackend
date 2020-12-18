const Sequelize = require('sequelize');

const Prueba = require('../models/prueba');
const Usuarios = require('../models/usuario');


const sequelize = new Sequelize('presupuesto', process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});
const Pru = Prueba(sequelize, Sequelize);
const Usuario = Usuarios(sequelize, Sequelize);

sequelize.sync({ force: false })
    .then(() => {
        console.log('Tablas sincronizadas');
    })

console.log('BD Online');


module.exports = {
    Pru,
    Usuario
}