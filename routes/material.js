/*
    RUTA: /api/Material
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const {
    getMateriales,
    crearMateriales,
    actualizarMateriales,
    borrarMateriales
} = require('../controllers/material')

const router = Router();

router.get('/', getMateriales);

router.post('/:itId', [
        validarJWT,
        check('nombre_material', "El nombre del material es requerido").not().isEmpty(),
        check('cantidad_material', "La cantidad es requerido").not().isEmpty(),
        check('precio_material', "El precio del material  es requerido").not().isEmpty(),
        validarCampos
    ],
    crearMateriales)

router.put('/:id', [
        validarJWT,
        check('nombre_material', "El nombre del material es requerido").not().isEmpty(),
        check('cantidad_material', "La cantidad es requerido").not().isEmpty(),
        check('precio_material', "El precio del material  es requerido").not().isEmpty(),
        validarCampos
    ],
    actualizarMateriales);

router.delete('/:id',
    borrarMateriales)


module.exports = router;