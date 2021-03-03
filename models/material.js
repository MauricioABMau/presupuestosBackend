module.exports = (sequelize, type) => {
    const material = sequelize.define('material', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_material: type.STRING,
        precio_material: type.STRING,
        cantidad_material: type.STRING,
    });

    return material
}