/*
    RUTA: /api/ManoObra
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const {
    getManoObra,
    crearManoObra,
    actualizarManoObra,
    borrarManoObra
} = require('../controllers/manoObra')

const router = Router();

router.get('/', getManoObra);

router.post('/', [],
    crearManoObra)

router.put('/:id', [],
    actualizarManoObra);

router.delete('/:id',
    borrarManoObra)


module.exports = router;