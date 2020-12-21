const fs = require('fs');

const { Usuario } = require('../database/config')

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        //Borrar la imagen anterior
        fs.unlinkSync(path);
    }
}

const actualiarImagen = async(tipo, id, nombreArchivo) => {
    let pahtViejo = '';

    switch (tipo) {
        case 'usuarios':
            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                return false;
            }

            pahtViejo = `./uploads/usuarios${usuario.imagen}`;
            borrarImagen(pahtViejo);

            usuario.imagen = nombreArchivo;
            await usuario.save();
            return true;
            break;

        default:
            break;
    }
}

module.exports = {
    actualiarImagen
}