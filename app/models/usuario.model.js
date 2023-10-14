module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuario", {
        uid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4, // Valor padrão para gerar um UUID v4
            primaryKey: true, // Define esta coluna como chave primária
        },
        email: {
            type: Sequelize.STRING,
            unique: true, // Define o campo como único
        },
        tipo: {
            type: Sequelize.INTEGER,
        },
        tipo_nome: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING,
        },
    },
        {
            tableName: 'usuario',
        });
    const AuthToken = sequelize.define('auth_token', {
        userId: Sequelize.UUID,
        token: Sequelize.STRING, // Token de autenticação
    });
    Usuario.hasMany(AuthToken);
    return Usuario;
};