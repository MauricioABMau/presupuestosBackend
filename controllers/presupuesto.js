const { response } = require('express');

const { Presupuesto, Proyecto, Usuario } = require('../database/config');


const getPresupuestos = async(req, res = response) => {
    desde = Number(req.query.desde) || 0;

    const [presupuesto, total] = await Promise.all([
        Presupuesto
        .findAll({
            include: [{
                model: Proyecto,
                include: [{
                    model: Usuario,
                    attributes: ['nombre', 'email', 'id']
                }],

            }, {
                model: Usuario
            }],
            limit: 5,
            offset: desde
        }),
        Presupuesto.count()

    ])

    res.json({
        ok: true,
        presupuesto,
        total
    })
}

const crearPresupuestos = async(req, res = response) => {
    const proId = req.params.proId;
    const id = req.id;
    const presupuesto = new Presupuesto({
        usuarioId: id,
        proyectoId: proId,
        ...req.body
    });
    try {

        const presupuestoDB = await presupuesto.save();

        res.json({
            ok: true,
            id,
            presupuesto: presupuestoDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const actualizarPresupuestos = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.id;

    try {
        const presupuesto = await Presupuesto.findByPk(id);
        if (!presupuesto) {
            return res.status(404).json({
                ok: true,
                msg: 'Presupuesto no encontrado'
            })
        }

        const cambiosPresupuesto = {
            ...req.body,
            usuarioId: uid
        }

        const presupuestoActualizado = await Presupuesto.findByPk(id);
        await presupuestoActualizado.update(cambiosPresupuesto);


        res.json({
            ok: true,
            presupuesto: presupuestoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }
}
const borrarPresupuestos = async(req, res = response) => {
    const id = req.params.id

    try {
        const presupuestoDB = await Presupuesto.findByPk(id);

        if (!presupuestoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un presupuesto con ese id'
            });
        }

        const presupuestoBorrado = await Presupuesto.findByPk(id);
        await presupuestoBorrado.destroy();

        res.json({
            ok: true,
            msg: 'Presupuesto eliminado'
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
    getPresupuestos,
    crearPresupuestos,
    actualizarPresupuestos,
    borrarPresupuestos
}