module.exports = (sequelize, type) => {
    const usuario = sequelize.define('usuario', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: type.STRING,
        apellido: type.STRING,
        email: type.STRING,
        password: type.STRING(150),
        estado: type.BOOLEAN,
        rol: type.STRING,
        imagen: type.STRING,
        google: type.BOOLEAN
    });
    //Ocultar password
    usuario.prototype.toJSON = function() {
        var values = Object.assign({}, this.get());

        delete values.password;
        return values;
    }

    return usuario
}