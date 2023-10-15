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
            allowNull: true,
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
            type: Sequelize.FLOAT,
        },
        longitude: {
            type: Sequelize.FLOAT,
        },
        natureza_uid: {
            type: Sequelize.UUID,
            references: {
                model: 'natureza_ocorrencia',
                key: 'uid'
            }
        },
        pessoa_uid: {
            type: Sequelize.UUID,
            references: {
                model: 'pessoa',
                key: 'uid'
            }
        },
        item_uid: {
            type: Sequelize.UUID,
            references: {
                model: 'item_subtraido',
                key: 'uid'
            }
        },
    },
        // {
        //     hooks: {
        //         beforeCreate: async (registro, options) => {
        //             console.log('fui executado?')
        //             const ultimoProtocolo = await registro.max('protocolo');
        //             const numero = parseFloat(ultimoProtocolo.match(/\d+/));
        //             registro.protocolo = ultimoProtocolo ? "aup" + numero + 1 : "aup" + 1;
        //         },
        //     }
        // },
        {
            tableName: 'registro_ocorrencia',
        });

    // RegistroOcorrencia.hook('beforeCreate', function (instance, options) {
    //     return new Promise(async (resolve, reject) => {
    //         console.log('fui executado?')
    //         const ultimoProtocolo = await registro.max('protocolo');
    //         const numero = parseFloat(ultimoProtocolo.match(/\d+/));
    //         registro.protocolo = ultimoProtocolo ? "aup" + numero + 1 : "aup" + 1;
    //         resolve('protocolo gerado');
    //     });
    // });

    return RegistroOcorrencia;
};