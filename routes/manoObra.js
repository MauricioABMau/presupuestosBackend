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
    borrarManoObra,
    getManoObraById
} = require('../controllers/manoObra')

const router = Router();

router.get('/', validarJWT, getManoObra);

router.post('/:itId', [
        validarJWT,
        check('cargo', "El nombre del material es requerido").not().isEmpty(),
        check('sueldo', "La cantidad es requerido").not().isEmpty(),
        check('nro_personal', "El numero de personas es requerido").not().isEmpty(),
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
    validarJWT,
    borrarManoObra)

router.get('/:id',
    validarJWT,
    getManoObraById)


module.exports = router;