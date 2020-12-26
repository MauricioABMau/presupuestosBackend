const { response } = require('express');
const bcrypt = require('bcryptjs');

const { Usuario } = require('../database/config');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res) => {
    desde = Number(req.query.desde) || 0;

    const [usuarios, total] = await Promise.all([
        Usuario
        .findAll({
            attributes: ['nombre', 'email', 'imagen', 'id', 'estado', 'rol', 'google'],
            limit: 5,
            offset: desde
        }),

        Usuario.count()
    ]);

    res.json({
        ok: true,
        usuarios,
        total,
    });
}

const crearUsuario = async(req, res = response) => {

    const { email, password, nombre } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ where: { email } })

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }

        const usuario = new Usuario(req.body);

        //Encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //Guardar usuario
        await usuario.save();

        //Generar el TOKEN
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

const actualizarUsuario = async(req, res = response) => {

    const id = req.params.id;

    try {

        const usuarioDB = await Usuario.findByPk(id);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con esa id'
            });
        }

        // TODO: Validar token
        //Actualizacion
        const { password, google, email, ...campos } = req.body;
        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({ where: { email } })
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }
        campos.email = email;

        const usuarioActualizado = await Usuario.findByPk(id);
        await usuarioActualizado.update(campos);

        res.json({
            ok: true,
            usuario: usuarioActualizado,
            usuarioDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const borrarUsuario = async(req, res = response) => {

    const id = req.params.id

    try {
        const usuarioDB = await Usuario.findByPk(id);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con esa id'
            });
        }

        const usuarioBorrado = await Usuario.findByPk(id);
        await usuarioBorrado.destroy();

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
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
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}