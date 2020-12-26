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

router.post('/:proId', [
        validarJWT,
        check('presupuesto_total', "El presupuesto total es requerido").not().isEmpty(),
        check('presupuesto_precio_unitario', "El presupuesto parcial del proyecto es requerido").not().isEmpty(),
        check('utilidad', "El utilidad es requerido").not().isEmpty(),
        check('iva', "El iva es requerido").not().isEmpty(),
        check('it', "El it es requerido").not().isEmpty(),
        validarCampos
    ],
    crearPresupuestos)

router.put('/:id', [
        validarJWT,
        check('presupuesto_total', "El presupuesto total es requerido").not().isEmpty(),
        check('presupuesto_precio_unitario', "El presupuesto parcial del proyecto es requerido").not().isEmpty(),
        check('utilidad', "El utilidad es requerido").not().isEmpty(),
        check('iva', "El iva es requerido").not().isEmpty(),
        check('it', "El it es requerido").not().isEmpty(),
        validarCampos
    ],
    actualizarPresupuestos);

router.delete('/:id',
    borrarPresupuestos)


module.exports = router;