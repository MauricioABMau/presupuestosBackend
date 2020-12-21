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

router.post('/', [],
    crearMateriales)

router.put('/:id', [],
    actualizarMateriales);

router.delete('/:id',
    borrarMateriales)


module.exports = router;