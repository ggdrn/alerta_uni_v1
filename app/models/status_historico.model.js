module.exports = (sequelize, Sequelize) => {
    const StatusHistorico = sequelize.define("status_historico", {
        uid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4, // Valor padrão para gerar um UUID v4
            primaryKey: true, // Define esta coluna como chave primária
        },
        justificativa: {
            type: Sequelize.TEXT,
        },
        status_novo: {
            type: Sequelize.STRING,
        },
        status_antigo: {
            type: Sequelize.STRING,
        },
        ocorrencia_uid: {
            type: Sequelize.UUID,
            references: {
                model: 'registro_ocorrencia',
                key: 'uid'
            }
        },
    },
        {
            tableName: 'status_historico',
        });

    return StatusHistorico;
};