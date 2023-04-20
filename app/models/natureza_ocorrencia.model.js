module.exports = (sequelize, Sequelize) => {
    const NaturezaOcorrencia = sequelize.define("natureza_ocorrencia", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nome: {
        type: Sequelize.STRING
      }, 
    categoria_id: {
        type: Sequelize.STRING,
        references: {
            model: 'categoria_ocorrencia',
            key: 'id'
          }
    },
    }, 
    {
        tableName:'natureza_ocorrencia',
    });
  
    return NaturezaOcorrencia;
  };