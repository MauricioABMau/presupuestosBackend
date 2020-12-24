const { response } = require('express');
const { Item, Presupuesto, Usuario } = require('../database/config');

const getItems = async(req, res = response) => {
    const item = await Item.findAll({
        include: [{
            model: Presupuesto,
            include: [{
                model: Usuario,
            }],

        }, {
            model: Usuario
        }]
    })

    res.json({
        ok: true,
        item,
    })
}
const crearItems = async(req, res = response) => {
    const preId = req.params.preId;
    const id = req.id;
    const item = new Item({
        usuarioId: id,
        presupuestoId: preId,
        ...req.body
    });
    try {

        const itemDB = await item.save();

        res.json({
            ok: true,
            id,
            item: itemDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const actualizarItems = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.id;

    try {
        const item = await Item.findByPk(id);
        if (!item) {
            return res.status(404).json({
                ok: true,
                msg: 'Item no encontrado'
            })
        }

        const cambiosItem = {
            ...req.body,
            usuarioId: uid
        }

        const itemActualizado = await Item.findByPk(id);
        await itemActualizado.update(cambiosItem);

        res.json({
            ok: true,
            item: itemActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }
}
const borrarItems = async(req, res = response) => {
    const id = req.params.id

    try {
        const itemDb = await Item.findByPk(id);

        if (!itemDb) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un item con ese id'
            });
        }

        const itemBorrado = await Item.findByPk(id);
        await itemBorrado.destroy();

        res.json({
            ok: true,
            msg: 'Item eliminado'
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
    getItems,
    crearItems,
    actualizarItems,
    borrarItems
}