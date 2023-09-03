module.exports = (sequelize, Sequelize) => {
    const VinculoUniversidade = sequelize.define("vinculo_universidade", {
        uid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4, // Valor padrão para gerar um UUID v4
            primaryKey: true, // Define esta coluna como chave primária
        },
        curso: {
            type: Sequelize.STRING,
        },
        departamento: {
            type: Sequelize.STRING,
        },
        matricula: {
            type: Sequelize.STRING,
        },
        tipo_uid: {
            type: Sequelize.UUID,
            references: {
                model: 'tipo_vinculo',
                key: 'uid'
            }
        },
    },
        {
            tableName: 'vinculo_universidade',
        });

    return VinculoUniversidade;
};