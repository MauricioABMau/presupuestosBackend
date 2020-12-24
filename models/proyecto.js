module.exports = (sequelize, type) => {
    const proyecto = sequelize.define('proyecto', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_proyecto: type.STRING,
        departamento: type.STRING,
        direccion: type.STRING,
    });

    return proyecto
}