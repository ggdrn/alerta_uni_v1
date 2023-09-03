module.exports = (sequelize, Sequelize) => {
    const VinculoUniversidade = sequelize.define("vinculo_universidade", {
        uid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4, // Valor padrão para gerar um UUID v4
            primaryKey: true, // Define esta coluna como chave primária
        },
        titulo: {
            type: Sequelize.STRING,
        },
    },
        {
            tableName: 'tipo_vinculo',
        });

    return VinculoUniversidade;
};