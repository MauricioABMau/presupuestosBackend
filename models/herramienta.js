module.exports = (sequelize, type) => {
    const herramienta = sequelize.define('herramienta', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_herramienta: type.STRING,
        tipo: type.STRING,
        precio_herramienta: type.DOUBLE,
    });

    return herramienta
}