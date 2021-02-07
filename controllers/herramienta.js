const { response } = require('express');
const { Herramienta, Item, Usuario } = require('../database/config');

const getHerramientas = async(req, res = response) => {
    desde = Number(req.query.desde) || 0;

    const [herramienta, total] = await Promise.all([
        Herramienta.findAll({
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
            limit: 5,
            offset: desde
        }),
        Item.count()
    ])

    res.json({
        ok: true,
        herramienta,
        total
    })
}

const getHerramientaById = async(req, res = response) => {
    const id = req.params.id;

    try {
        const [herramienta] = await Promise.all([
            Herramienta
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
            herramienta,
        })
    } catch (error) {
        res.json({
            ok: false,
            msg: 'Hamble con el administrador'
        })
    }
}
const crearHerramientas = async(req, res = response) => {
    const itId = req.params.preId;
    const id = req.id;
    const herramienta = new Herramienta({
        usuarioId: id,
        itemId: itId,
        ...req.body
    });
    try {

        const herramientaDB = await herramienta.save();

        res.json({
            ok: true,
            id,
            herramientaDB: herramientaDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const actualizarHerramientas = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.id;

    try {
        const herramienta = await Herramienta.findByPk(id);
        if (!herramienta) {
            return res.status(404).json({
                ok: true,
                msg: 'Herramienta no encontrado'
            })
        }

        const cambiosHerramienta = {
            ...req.body,
            usuarioId: uid
        }

        const herramientaActualizado = await Herramienta.findByPk(id);
        await herramientaActualizado.update(cambiosHerramienta);

        res.json({
            ok: true,
            herramienta: herramientaActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }
}
const borrarHerramientas = async(req, res = response) => {
    const id = req.params.id

    try {
        const herramientaDb = await Herramienta.findByPk(id);

        if (!herramientaDb) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un herramienta con ese id'
            });
        }

        const herramientaBorrado = await Herramienta.findByPk(id);
        await herramientaBorrado.destroy();

        res.json({
            ok: true,
            msg: 'Herramienta eliminado'
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
    getHerramientas,
    crearHerramientas,
    actualizarHerramientas,
    borrarHerramientas,
    getHerramientaById
}