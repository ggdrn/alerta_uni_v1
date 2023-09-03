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
    }, 
    {
        tableName:'pessoa',
    });
  
    return Pessoa;
  };