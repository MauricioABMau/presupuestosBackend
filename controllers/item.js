const { response } = require('express');

const getItems = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'getItem'
    })
}
const crearItems = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'crearItem'
    })
}
const actualizarItems = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarItem'
    })
}
const borrarItems = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarItem'
    })
}

module.exports = {
    getItems,
    crearItems,
    actualizarItems,
    borrarItems
}