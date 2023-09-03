module.exports = (sequelize, Sequelize) => {
    const NaturezaOcorrencia = sequelize.define("natureza_ocorrencia", {
		uid: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4, // Valor padrão para gerar um UUID v4
			primaryKey: true, // Define esta coluna como chave primária
		},
		nome: {
			type: Sequelize.STRING
		}, 
		categoria_uid: {
			type: Sequelize.STRING,
			references: {
				model: 'categoria_ocorrencia',
				key: 'uid'
			}
		},
    }, 
    {
        tableName:'natureza_ocorrencia',
    });
  
    return NaturezaOcorrencia;
  };