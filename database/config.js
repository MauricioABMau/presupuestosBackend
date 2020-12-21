const Sequelize = require('sequelize');

const Prueba = require('../models/prueba');
const Usuarios = require('../models/usuario');
const Proyectos = require('../models/proyecto');
const Presupuestos = require('../models/presupuesto');
const Items = require('../models/item');
const Materiales = require('../models/material');
const Herramientas = require('../models/herramienta');
const ManoObras = require('../models/manoObra');




const sequelize = new Sequelize('presupuesto', process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});
const Pru = Prueba(sequelize, Sequelize);
const Usuario = Usuarios(sequelize, Sequelize);
const Proyecto = Proyectos(sequelize, Sequelize);
const Presupuesto = Presupuestos(sequelize, Sequelize);
const Item = Items(sequelize, Sequelize);
const Material = Materiales(sequelize, Sequelize);
const Herramienta = Herramientas(sequelize, Sequelize);
const ManoObra = ManoObras(sequelize, Sequelize);

//Relacion de tablas
Usuario.hasMany(Proyecto);
Proyecto.belongsTo(Usuario);
Proyecto.hasOne(Presupuesto);

sequelize.sync({ force: false })
    .then(() => {
        console.log('Tablas sincronizadas');
    })

console.log('BD Online');


module.exports = {
    Pru,
    Usuario,
    Proyecto,
    Presupuesto,
    Item,
    Material,
    Herramienta,
    ManoObra
}