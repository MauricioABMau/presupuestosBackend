module.exports = (sequelize, type) => {
    const item = sequelize.define('item', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: type.STRING,
        unidad: type.INTEGER,
        cantidad: type.INTEGER,
        precio_producto: type.DOUBLE,
    });

    return item
}