const { response } = require('express');
const bcrypt = require('bcryptjs');

const { Usuario } = require('../database/config');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const usuario = require('../models/usuario');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');


const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //Verificar email
        const usuarioDB = await Usuario.findOne({ where: { email } });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no valido'
            });
        }

        //Verificar password
        //Cambiar mensaje de respuesta
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password no valido',
            });
        }

        //Generar el TOKEN
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd(usuarioDB.rol)
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token;
    try {
        const { name, email, picture } = await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({ where: { email } });
        let usuario;
        if (!usuarioDB) {
            //Si no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                imagen: picture,
                google: true
            });
        } else {
            console.log("ENTRA");
            //Existe usuario
            usuario = usuarioDB;
            usuario.google = true;
        }
        //Guardar en base de datos
        await usuario.save();

        //Generar el TOKEN
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd(usuario.rol)
        })

    } catch (error) {
        res.json({
            ok: false,
            msg: 'Token no es correcto'
        })

    }
}

const renewToken = async(req, res = response) => {
    const id = req.id;

    //Generar el TOKEN
    const token = await generarJWT(id);

    //Obtener el usuario
    const usuario = await Usuario.findByPk(id);

    res.json({
        ok: true,
        token,
        usuario,
        menu: getMenuFrontEnd(usuario.rol)
    })
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}