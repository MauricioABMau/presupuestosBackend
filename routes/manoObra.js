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

router.post('/:itId', [
        validarJWT,
        check('cargo', "El nombre del material es requerido").not().isEmpty(),
        check('sueldo', "La cantidad es requerido").not().isEmpty(),
        validarCampos
    ],
    crearManoObra)

router.put('/:id', [
        validarJWT,
        check('cargo', "El nombre del material es requerido").not().isEmpty(),
        check('sueldo', "La cantidad es requerido").not().isEmpty(),
        validarCampos
    ],
    actualizarManoObra);

router.delete('/:id',
    borrarManoObra)


module.exports = router;