const { response } = require('express');
const { Sequelize } = require('sequelize');

const Op = Sequelize.Op;

const { Usuario } = require('../database/config');
const { Proyecto } = require('../database/config');

const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda;

    const [usuarios, proyectos] = await Promise.all([
        Usuario.findAll({
            where: {
                nombre: {
                    [Op.like]: '%' + busqueda + '%'
                }
            }
        }),
        Proyecto.findAll({
            where: {
                nombre_proyecto: {
                    [Op.like]: '%' + busqueda + '%'
                }
            }
        })
    ])



    res.json({
        ok: true,
        usuarios,
        proyectos
    })
}
const getDocumentosColeccion = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;

    let data = [];

    switch (tabla) {
        case 'usuarios':
            data = await Usuario.findAll({
                where: {
                    nombre: {
                        [Op.like]: '%' + busqueda + '%'
                    }
                }
            });
            break;
        case 'proyectos':
            data = Proyecto.findAll({
                where: {
                    nombre_proyecto: {
                        [Op.like]: '%' + busqueda + '%'
                    }
                }
            });

            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'No es la direccion correcta'
            })
    }

    res.json({
        ok: true,
        resultados: data
    })
}

module.exports = {
    getTodo,
    getDocumentosColeccion
}