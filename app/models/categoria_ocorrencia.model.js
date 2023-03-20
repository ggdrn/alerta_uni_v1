module.exports = (sequelize, Sequelize) => {
    const CategoriaOcorrencia = sequelize.define("categoria_ocorrencia", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: Sequelize.STRING
      }, 
    }, 
    {
        tableName:'categoria_ocorrencia',
    });
  
    return CategoriaOcorrencia;
  };