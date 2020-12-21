const { response } = require('express');

const { Presupuesto, Proyecto, Usuario } = require('../database/config');


const getPresupuestos = async(req, res = response) => {

    const presupuesto = await Presupuesto.findAll({
        include: [{
            model: Usuario,
            attributes: ['nombre', 'email', 'id']
        }]
    })
    res.json({
        ok: true,
        presupuesto
    })
}
const crearPresupuestos = async(req, res = response) => {

    const id = req.id;
    const presupuesto = new Presupuesto({
        usuarioId: id,
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
const actualizarPresupuestos = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarPresupuesto'
    })
}
const borrarPresupuestos = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarPresupuesto'
    })
}

module.exports = {
    getPresupuestos,
    crearPresupuestos,
    actualizarPresupuestos,
    borrarPresupuestos
}