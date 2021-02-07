const { response } = require('express');
const { Sequelize } = require('sequelize');

const Op = Sequelize.Op;

const { Usuario, Presupuesto, Gasto, Item, Herramienta, Material, ManoObra } = require('../database/config');
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
            data = await Proyecto.findAll({
                where: {
                    nombre_proyecto: {
                        [Op.like]: '%' + busqueda + '%'
                    }
                }
            });

            break;

        case 'presupuestos':
            data = await Presupuesto.findAll({
                include: [{
                    model: Proyecto,
                    include: [{
                        model: Usuario,
                        attributes: ['nombre', 'email', 'id']
                    }],

                }, {
                    model: Usuario
                }],
                where: {
                    id: {
                        [Op.like]: '%' + busqueda + '%'
                    }
                }
            });

            break;

        case 'gastos':
            data = await Gasto.findAll({

                where: {
                    id: {
                        [Op.like]: '%' + busqueda + '%'
                    }
                }
            });

            break;

        case 'items':
            data = await Item.findAll({
                where: {
                    id: {
                        [Op.like]: '%' + busqueda + '%'
                    }
                }
            });

            break;

        case 'herramientas':
            data = await Herramienta.findAll({
                where: {
                    id: {
                        [Op.like]: '%' + busqueda + '%'
                    }
                }
            });

            break;

        case 'materiales':
            data = await Material.findAll({
                where: {
                    id: {
                        [Op.like]: '%' + busqueda + '%'
                    }
                }
            });

            break;

        case 'manoObra':
            data = await ManoObra.findAll({
                where: {
                    id: {
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