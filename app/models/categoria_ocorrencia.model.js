module.exports = (sequelize, Sequelize) => {
    const CategoriaOcorrencia = sequelize.define("categoria_ocorrencia", {
    uid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4, // Valor padrão para gerar um UUID v4
        primaryKey: true, // Define esta coluna como chave primária
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