module.exports = (sequelize, Sequelize) => {
    const Pessoa = sequelize.define("pessoa", {
        uid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4, // Valor padrão para gerar um UUID v4
            primaryKey: true, // Define esta coluna como chave primária
        },
        nome: {
            type: Sequelize.STRING,
        },
        rg: {
            type: Sequelize.STRING,
            unique: true, // Define o campo como único
        },
        endereco: {
            type: Sequelize.STRING,
        },
        genero: {
            type: Sequelize.STRING,
        },
        universidade_uid: {
            type: Sequelize.UUID,
            references: {
                model: 'vinculo_universidade',
                key: 'uid'
            }
        }
    },
        {
            tableName: 'pessoa',
        });

    const Autor = sequelize.define('Autor', {
        instrumento_portado: {
            type: Sequelize.STRING,
        },
    }, {
        tableName: 'autor',
    });

    const Vitima = sequelize.define('Vitima', {
        email: {
            type: Sequelize.STRING,
        },
        data_nascimento: {
            type: Sequelize.DATE,
        },
        telefone: {
            type: Sequelize.STRING,
        },
    }, {
        tableName: 'vitima',
    });

    // Associe os modelos Autor e Vitima com o modelo Pessoa usando polimorfismo
    Pessoa.hasOne(Autor, { foreignKey: 'pessoa_uid', constraints: false });
    Pessoa.hasOne(Vitima, { foreignKey: 'pessoa_uid', constraints: false });

    return Pessoa;
};