const { response } = require('express');

const getManoObra = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'getManoObra'
    })
}
const crearManoObra = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'crearManoObra'
    })
}
const actualizarManoObra = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarManoObra'
    })
}
const borrarManoObra = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarManoObra'
    })
}

module.exports = {
    getManoObra,
    crearManoObra,
    actualizarManoObra,
    borrarManoObra
}