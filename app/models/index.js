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
db.registro_ocorrencia = require("./registro_ocorrencia.model")(sequelize, Sequelize);

module.exports = db;