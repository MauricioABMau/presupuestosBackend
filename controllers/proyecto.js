const { response } = require('express');

const { Proyecto, Usuario } = require('../database/config');


const getProyectos = async(req, res = response) => {

    const proyecto = await Proyecto.findAll({
        include: [{
            model: Usuario,
            attributes: ['nombre', 'email', 'id']
        }]
    })
    res.json({
        ok: true,
        proyecto
    })
}
const crearProyectos = async(req, res = response) => {

    const id = req.id;
    const proyecto = new Proyecto({
        usuarioId: id,
        ...req.body
    });

    try {
        const proyectoDB = await proyecto.save();

        res.json({
            ok: true,
            id,
            proyectoDB
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const actualizarProyectos = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarProyecto'
    })
}
const borrarProyectos = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarProyecto'
    })
}

module.exports = {
    getProyectos,
    crearProyectos,
    actualizarProyectos,
    borrarProyectos
}