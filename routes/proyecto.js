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
    borrarProyectos
} = require('../controllers/proyecto')

const router = Router();

router.get('/', getProyectos);

router.post('/', [
        validarJWT,
        check('nombre_proyecto', 'El nombre del proyecto es necesario').not().isEmpty(),
        validarCampos
    ],
    crearProyectos)

router.put('/:id', [],
    actualizarProyectos);

router.delete('/:id',
    borrarProyectos)


module.exports = router;