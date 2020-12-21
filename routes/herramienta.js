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
    borrarHerramientas
} = require('../controllers/herramienta')

const router = Router();

router.get('/', getHerramientas);

router.post('/', [],
    crearHerramientas)

router.put('/:id', [],
    actualizarHerramientas);

router.delete('/:id',
    borrarHerramientas)


module.exports = router;