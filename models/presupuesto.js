module.exports = (sequelize, type) => {
    const presupuesto = sequelize.define('presupuesto', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        presupuesto_total: type.DOUBLE,
        presupuesto_precio_unitario: type.DOUBLE
    });

    return presupuesto
}