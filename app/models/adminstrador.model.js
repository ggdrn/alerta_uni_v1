module.exports = (sequelize, Sequelize) => {
    const Adminstrador = sequelize.define("administrador", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: Sequelize.STRING,
      }, 
    email: {
        type: Sequelize.STRING,
        unique: true, 
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