module.exports = (sequelize, Sequelize) => {
    const RegistroOcorrencia = sequelize.define("registro_ocorrencia", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    status: {
        type: Sequelize.STRING
      },    
    protocolo: {
        type: Sequelize.STRING
    },    
    descricao: {
        type: Sequelize.STRING
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
    natureza_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'natureza_ocorrencia',
            key: 'id'
          }
    },    
    pessoa_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'pessoa',
            key: 'id'
          }
    },
    }, 
    {
        tableName:'registro_ocorrencia',
    });
  
    return RegistroOcorrencia;
  };