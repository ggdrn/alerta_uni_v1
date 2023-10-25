const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.PORT,
  // operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.adminstrador = require("./adminstrador.model")(sequelize, Sequelize);
const CategoriaOcorrencia = db.categoria_ocorrencia = require("./categoria_ocorrencia.model")(sequelize, Sequelize);
const NaturezaOcorrencia = db.natureza_ocorrencia = require("./natureza_ocorrencia.model")(sequelize, Sequelize);
const ItemSubtraido = db.item_subtraido = require("./item_subtraido.model")(sequelize, Sequelize);
const TipoVinculo = db.tipo_vinculo = require("./tipo_vinculo.model")(sequelize, Sequelize);
const VinculoUniversidade = db.vinculo_universidade = require("./vinculo_universidade.model")(sequelize, Sequelize);
const RegistroOcorrencia = db.registro_ocorrencia = require("./registro_ocorrencia.model")(sequelize, Sequelize);
const Pessoa = db.pessoa = require("./pessoa.model")(sequelize, Sequelize);
db.usuario = require("./usuario.model")(sequelize, Sequelize);

// Definindo as associações

NaturezaOcorrencia.belongsTo(CategoriaOcorrencia, { foreignKey: 'categoria_uid' });

RegistroOcorrencia.belongsTo(ItemSubtraido, { foreignKey: 'item_uid' });
RegistroOcorrencia.belongsTo(NaturezaOcorrencia, { foreignKey: 'natureza_uid' });
RegistroOcorrencia.belongsTo(Pessoa, { foreignKey: 'pessoa_uid' });

Pessoa.belongsTo(VinculoUniversidade, { foreignKey: 'universidade_uid' });
VinculoUniversidade.belongsTo(TipoVinculo, { foreignKey: 'tipo_uid' });


module.exports = db;