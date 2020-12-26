module.exports = (sequelize, type) => {
    const gasto = sequelize.define('gasto', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        lugar: type.DOUBLE,
        profesional: type.DOUBLE,
        documentos_legales: type.DOUBLE,
        costo_garantia_contratos: type.DOUBLE,
        costo_operacion: type.DOUBLE,
        costo_administrativo: type.DOUBLE,
        gasto_profecional_especial: type.DOUBLE,
        riesgo_imprevisto: type.DOUBLE,
        movilizacion_demolicion: type.DOUBLE,
    });

    return gasto
}