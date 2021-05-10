module.exports = (sequelize, type) => {
    const manoObra = sequelize.define('manoObra', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cargo: type.STRING,
        sueldo: type.DOUBLE,
        horas: type.DOUBLE,
        nro_personal: type.STRING,
    });

    return manoObra
}