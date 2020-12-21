const { response } = require('express');

const getHerramientas = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'getHerramienta'
    })
}
const crearHerramientas = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'crearHerramienta'
    })
}
const actualizarHerramientas = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarHerramienta'
    })
}
const borrarHerramientas = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarHerramienta'
    })
}

module.exports = {
    getHerramientas,
    crearHerramientas,
    actualizarHerramientas,
    borrarHerramientas
}