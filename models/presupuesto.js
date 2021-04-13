module.exports = (sequelize, type) => {
    const presupuesto = sequelize.define('presupuesto', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        presupuesto_total: type.DOUBLE,
        presupuesto_precio_unitario: type.DOUBLE,
        utilidad: type.DOUBLE,
        iva: type.DOUBLE,
        it: type.DOUBLE,
        actividad: type.STRING,
        unidad: type.STRING,
        codigo: type.STRING,
        numero: type.INTEGER,
        moneda: type.STRING

    });

    return presupuesto
}