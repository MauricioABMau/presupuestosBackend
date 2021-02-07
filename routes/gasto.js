/*
    RUTA: /api/gasto
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const {
    getGasto,
    crearGasto,
    actualizarGasto,
    borrarGasto
} = require('../controllers/gasto');
const { getHerramientaById } = require('../controllers/herramienta');

const router = Router();

router.get('/', validarJWT, getGasto);

router.post('/:preId', [
        validarJWT,
        check('lugar', "El lugar es requerido").not().isEmpty(),
        check('profesional', "El profesional es requerido").not().isEmpty(),
        check('documentos_legales', "El documento legale es requerido").not().isEmpty(),
        check('costo_garantia_contratos', "El costo garantia contratos es requerido").not().isEmpty(),
        check('costo_operacion', "El costo operacion es requerido").not().isEmpty(),
        check('costo_administrativo', "El costo administrativo es requerido").not().isEmpty(),
        check('gasto_profecional_especial', "El gasto profecional especial es requerido").not().isEmpty(),
        check('riesgo_imprevisto', "El riesgo imprevisto es requerido").not().isEmpty(),
        check('movilizacion_demolicion', "El movilizacion demolicion es requerido").not().isEmpty(),
        validarCampos
    ],
    crearGasto)

router.put('/:id', [
        validarJWT,
        check('lugar', "El lugar es requerido").not().isEmpty(),
        check('profesional', "El profesional es requerido").not().isEmpty(),
        check('documentos_legales', "El documento legale es requerido").not().isEmpty(),
        check('costo_garantia_contratos', "El costo garantia contratos es requerido").not().isEmpty(),
        check('costo_operacion', "El costo operacion es requerido").not().isEmpty(),
        check('costo_administrativo', "El costo administrativo es requerido").not().isEmpty(),
        check('gasto_profecional_especial', "El gasto profecional especial es requerido").not().isEmpty(),
        check('riesgo_imprevisto', "El riesgo imprevisto es requerido").not().isEmpty(),
        check('movilizacion_demolicion', "El movilizacion demolicion es requerido").not().isEmpty(),
        validarCampos
    ],
    actualizarGasto);

router.delete('/:id',
    validarJWT,
    borrarGasto)

router.get('/:id',
    validarJWT,
    getHerramientaById)


module.exports = router;