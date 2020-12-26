const { response } = require('express');
const { Gasto, Presupuesto, Usuario } = require('../database/config');

const getGasto = async(req, res = response) => {
    const gasto = await Gasto.findAll({
        include: [{
            model: Presupuesto,
            include: [{
                model: Usuario,
            }],

        }, {
            model: Usuario
        }]
    })

    res.json({
        ok: true,
        gasto,
    })
}
const crearGasto = async(req, res = response) => {
    const preId = req.params.preId;
    const id = req.id;
    const gasto = new Gasto({
        usuarioId: id,
        presupuestoId: preId,
        ...req.body
    });
    try {

        const gastoDB = await gasto.save();

        res.json({
            ok: true,
            id,
            gasto: gastoDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const actualizarGasto = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.id;

    try {
        const gasto = await Gasto.findByPk(id);
        if (!gasto) {
            return res.status(404).json({
                ok: true,
                msg: 'Gasto no encontrado'
            })
        }

        const cambiosGasto = {
            ...req.body,
            usuarioId: uid
        }

        const gastoActualizado = await Gasto.findByPk(id);
        await gastoActualizado.update(cambiosGasto);

        res.json({
            ok: true,
            gasto: gastoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }
}
const borrarGasto = async(req, res = response) => {
    const id = req.params.id

    try {
        const gastoDb = await Gasto.findByPk(id);

        if (!gastoDb) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un gasto con ese id'
            });
        }

        const gastoBorrado = await Gasto.findByPk(id);
        await gastoBorrado.destroy();

        res.json({
            ok: true,
            msg: 'Gasto eliminado'
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
    getGasto,
    crearGasto,
    actualizarGasto,
    borrarGasto
}