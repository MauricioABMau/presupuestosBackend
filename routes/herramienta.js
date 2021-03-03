/*
    RUTA: /api/Herramientas
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const {
    getHerramientas,
    crearHerramientas,
    actualizarHerramientas,
    borrarHerramientas,
    getHerramientaById
} = require('../controllers/herramienta')

const router = Router();

router.get('/', validarJWT, getHerramientas);

router.post('/:itId', [
        validarJWT,
        check('nombre_herramienta', "El nombre de la herramienta es requerido").not().isEmpty(),
        check('tipo', "El tipo de herramienta es requerido").not().isEmpty(),
        check('precio_herramienta', "El precio de la herramienta  es requerido").not().isEmpty(),
        check('cantidad_herramienta', "La cantidad es requerida").not().isEmpty(),
        validarCampos
    ],
    crearHerramientas)

router.put('/:id', [
        validarJWT,
        check('nombre_herramienta', "El nombre de la herramienta es requerido").not().isEmpty(),
        check('tipo', "El tipo de herramienta es requerido").not().isEmpty(),
        check('precio_herramienta', "El precio de la herramienta  es requerido").not().isEmpty(),
        validarCampos
    ],
    actualizarHerramientas);

router.delete('/:id',
    validarJWT,
    borrarHerramientas)

router.get('/:id',
    validarJWT,
    getHerramientaById)



module.exports = router;