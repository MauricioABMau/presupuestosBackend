const { response } = require('express');
const { Material, Item, Usuario } = require('../database/config');

const getMateriales = async(req, res = response) => {
    const material = await Material.findAll({
        include: [{
            model: Item,
            include: [{
                model: Usuario,
            }],

        }, {
            model: Usuario
        }]
    })

    res.json({
        ok: true,
        material,
    })
}
const crearMateriales = async(req, res = response) => {
    const itId = req.params.preId;
    const id = req.id;
    const material = new Material({
        usuarioId: id,
        itemId: itId,
        ...req.body
    });
    try {

        const materialDB = await material.save();

        res.json({
            ok: true,
            id,
            material: materialDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const actualizarMateriales = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.id;

    try {
        const material = await Material.findByPk(id);
        if (!material) {
            return res.status(404).json({
                ok: true,
                msg: 'Material no encontrado'
            })
        }

        const cambiosMaterial = {
            ...req.body,
            usuarioId: uid
        }

        const materialActualizado = await Material.findByPk(id);
        await materialActualizado.update(cambiosMaterial);

        res.json({
            ok: true,
            material: materialActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }
}
const borrarMateriales = async(req, res = response) => {
    const id = req.params.id

    try {
        const materialDb = await Material.findByPk(id);

        if (!materialDb) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un material con ese id'
            });
        }

        const materialBorrado = await Material.findByPk(id);
        await materialBorrado.destroy();

        res.json({
            ok: true,
            msg: 'Material eliminado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    getMateriales,
    crearMateriales,
    actualizarMateriales,
    borrarMateriales
}