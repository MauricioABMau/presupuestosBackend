/*
    RUTA: /api/Items
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const {
    getItems,
    crearItems,
    actualizarItems,
    borrarItems
} = require('../controllers/item')

const router = Router();

router.get('/', getItems);

router.post('/:preId', [
        validarJWT,
        check('descripcion', "La descripcion es requerido").not().isEmpty(),
        check('unidad', "La unidad es requerido").not().isEmpty(),
        check('cantidad', "La cantidad  es requerido").not().isEmpty(),
        check('precio_producto', "El  es requerido").not().isEmpty(),
        validarCampos
    ],
    crearItems)

router.put('/:id', [
        validarJWT,
        check('descripcion', "La descripcion es requerido").not().isEmpty(),
        check('unidad', "La unidad es requerido").not().isEmpty(),
        check('cantidad', "La cantidad  es requerido").not().isEmpty(),
        check('precio_producto', "El  es requerido").not().isEmpty(),
        validarCampos
    ],
    actualizarItems);

router.delete('/:id',
    borrarItems)


module.exports = router;