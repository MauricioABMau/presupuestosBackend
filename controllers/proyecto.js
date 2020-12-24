const { response } = require('express');

const { Proyecto, Usuario } = require('../database/config');
const proyecto = require('../models/proyecto');


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
const actualizarProyectos = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.id;

    try {
        const proyecto = await Proyecto.findByPk(id);
        if (!proyecto) {
            return res.status(404).json({
                ok: true,
                msg: 'Proyecto no encontrado'
            })
        }

        const cambiosProyecto = {
            ...req.body,
            usuario: uid
        }

        const proyectoActualizado = await Proyecto.findByPk(id);
        await proyectoActualizado.update(cambiosProyecto);


        res.json({
            ok: true,
            proyecto: proyectoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }
}
const borrarProyectos = async(req, res = response) => {
    const id = req.params.id;

    try {
        const proyecto = await Proyecto.findByPk(id);
        if (!proyecto) {
            return res.status(404).json({
                ok: true,
                msg: 'Proyecto no encontrado'
            })
        }

        const proyectoBorrado = await Proyecto.findByPk(id);
        await proyectoBorrado.destroy();

        res.json({
            ok: true,
            msg: "Proyecto borrado"
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }
}

module.exports = {
    getProyectos,
    crearProyectos,
    actualizarProyectos,
    borrarProyectos
}