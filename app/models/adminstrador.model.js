module.exports = (sequelize, Sequelize) => {
    const Adminstrador = sequelize.define("administrador", {
    uid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4, // Valor padrão para gerar um UUID v4
        primaryKey: true, // Define esta coluna como chave primária
    },
    nome: {
        type: Sequelize.STRING,
      }, 
    email: {
        type: Sequelize.STRING,
        unique: true, // Define o campo como único
    },      
    cpf: {
        type: Sequelize.STRING,
        unique: true, 
    },
    }, 
    {
        tableName:'administrador',
    });
  
    return Adminstrador;
  };