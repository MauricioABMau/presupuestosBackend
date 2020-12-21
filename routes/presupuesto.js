/*
    RUTA: /api/Presupuestos
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const {
    getPresupuestos,
    crearPresupuestos,
    actualizarPresupuestos,
    borrarPresupuestos
} = require('../controllers/presupuesto')

const router = Router();

router.get('/', getPresupuestos);

router.post('/', [
        validarJWT
    ],
    crearPresupuestos)

router.put('/:id', [],
    actualizarPresupuestos);

router.delete('/:id',
    borrarPresupuestos)


module.exports = router;