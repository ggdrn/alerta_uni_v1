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
db.categoria_ocorrencia = require("./categoria_ocorrencia.model")(sequelize, Sequelize);
db.natureza_ocorrencia = require("./natureza_ocorrencia.model")(sequelize, Sequelize);
db.item_subtraido = require("./item_subtraido.model")(sequelize, Sequelize);
db.tipo_vinculo = require("./tipo_vinculo.model")(sequelize, Sequelize);
db.vinculo_universidade = require("./vinculo_universidade.model")(sequelize, Sequelize);
db.registro_ocorrencia = require("./registro_ocorrencia.model")(sequelize, Sequelize);
db.pessoa = require("./pessoa.model")(sequelize, Sequelize);
db.usuario = require("./usuario.model")(sequelize, Sequelize);
module.exports = db;