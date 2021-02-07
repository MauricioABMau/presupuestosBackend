/*
    RUTA: /api/proyectos
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const {
    getProyectos,
    crearProyectos,
    actualizarProyectos,
    borrarProyectos,
    getProyectosById
} = require('../controllers/proyecto')

const router = Router();

router.get('/', validarJWT, getProyectos);

router.post('/', [
        validarJWT,
        check('nombre_proyecto', 'El nombre del proyecto es necesario').not().isEmpty(),
        check('departamento', "El nombre del proyecto es requerido").not().isEmpty(),
        check('direccion', "El nombre del proyecto es requerido").not().isEmpty(),
        validarCampos
    ],
    crearProyectos)

router.put('/:id', [
        validarJWT,
        check('nombre_proyecto', "El nombre del proyecto es requerido").not().isEmpty(),
        check('departamento', "El nombre del proyecto es requerido").not().isEmpty(),
        check('direccion', "El nombre del proyecto es requerido").not().isEmpty(),
        validarCampos
    ],
    actualizarProyectos);

router.delete('/:id',
    validarJWT,
    borrarProyectos)

router.get('/:id',
    validarJWT,
    getProyectosById)


module.exports = router;