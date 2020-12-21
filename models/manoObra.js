module.exports = (sequelize, type) => {
    const manoObra = sequelize.define('manoObra', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cargo: type.STRING,
        sueldo: type.DOUBLE,
    });

    return manoObra
}