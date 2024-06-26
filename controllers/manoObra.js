const { response } = require('express');
const { ManoObra, Item, Usuario } = require('../database/config');

const getManoObra = async(req, res = response) => {
    desde = Number(req.query.desde) || 0;

    const [manoObra, total] = await Promise.all([
        ManoObra.findAll({
            include: [{
                model: Item,
                include: [{
                    model: Usuario,
                    attributes: ['nombre', 'email', 'id']
                }],
            }, {
                model: Usuario,
                attributes: ['nombre', 'email', 'id']
            }],
            limit: 50,
            offset: desde
        }),
        ManoObra.count()
    ])

    res.json({
        ok: true,
        manoObra,
        total
    })
}

const getManoObraById = async(req, res = response) => {
    const id = req.params.id;

    try {

        const [manoObra] = await Promise.all([
            ManoObra
            .findByPk(id, {
                include: [{
                    model: Item,
                    include: [{
                        model: Usuario,
                        attributes: ['nombre', 'email', 'id']
                    }],
                }, {
                    model: Usuario,
                    attributes: ['nombre', 'email', 'id']
                }],
            }),

        ])

        res.json({
            ok: true,
            manoObra,
        })
    } catch (error) {
        res.json({
            ok: false,
            msg: 'Hamble con el administrador'
        })
    }
}
const crearManoObra = async(req, res = response) => {
    const itId = req.params.itId;
    const id = req.id;
    const manoObra = new ManoObra({
        usuarioId: id,
        itemId: itId,
        ...req.body
    });
    try {

        const manoObraDB = await manoObra.save();

        res.json({
            ok: true,
            id,
            manoObraDB: manoObraDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const actualizarManoObra = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.id;

    try {
        const manoObra = await ManoObra.findByPk(id);
        if (!manoObra) {
            return res.status(404).json({
                ok: true,
                msg: 'Mano de obra no encontrado'
            })
        }

        const cambiosManoObra = {
            ...req.body,
            usuarioId: uid
        }

        const manoObraActualizado = await ManoObra.findByPk(id);
        await manoObraActualizado.update(cambiosManoObra);

        res.json({
            ok: true,
            manoObra: manoObraActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }
}
const borrarManoObra = async(req, res = response) => {
    const id = req.params.id

    try {
        const manoObraDb = await ManoObra.findByPk(id);

        if (!manoObraDb) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un manoObra con ese id'
            });
        }

        const manoObraBorrado = await ManoObra.findByPk(id);
        await manoObraBorrado.destroy();

        res.json({
            ok: true,
            msg: 'ManoObra eliminado'
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
    getManoObra,
    crearManoObra,
    actualizarManoObra,
    borrarManoObra,
    getManoObraById
}