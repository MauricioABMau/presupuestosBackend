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

router.post('/', [],
    crearItems)

router.put('/:id', [],
    actualizarItems);

router.delete('/:id',
    borrarItems)


module.exports = router;