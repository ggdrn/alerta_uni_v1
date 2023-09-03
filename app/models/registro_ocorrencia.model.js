module.exports = (sequelize, Sequelize) => {
    const RegistroOcorrencia = sequelize.define("registro_ocorrencia", {
        uid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4, // Valor padrão para gerar um UUID v4
            primaryKey: true, // Define esta coluna como chave primária
        },
        status: {
            type: Sequelize.STRING
        },
        protocolo: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        descricao: {
            type: Sequelize.STRING(255),
        },
        classificacao: {
            type: Sequelize.STRING
        },
        data_ocorrencia: {
            type: Sequelize.DATE,
        },
        local: {
            type: Sequelize.STRING,
        },
        latitude: {
            type: Sequelize.INTEGER,
        },
        longitude: {
            type: Sequelize.INTEGER,
        },
        natureza_uid: {
            type: Sequelize.STRING,
            references: {
                model: 'natureza_ocorrencia',
                key: 'uid'
            }
        },
        pessoa_uid: {
            type: Sequelize.STRING,
            references: {
                model: 'pessoa',
                key: 'uid'
            }
        },
        item_uid: {
            type: Sequelize.STRING,
            references: {
                model: 'item_subtraido',
                key: 'uid'
            }
        },
    },
        {
            tableName: 'registro_ocorrencia',
        });

    return RegistroOcorrencia;
};