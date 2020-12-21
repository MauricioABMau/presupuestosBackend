const { response } = require('express');

const getMateriales = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'getmaterial'
    })
}
const crearMateriales = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'crearmaterial'
    })
}
const actualizarMateriales = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarmaterial'
    })
}
const borrarMateriales = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarmaterial'
    })
}

module.exports = {
    getMateriales,
    crearMateriales,
    actualizarMateriales,
    borrarMateriales
}