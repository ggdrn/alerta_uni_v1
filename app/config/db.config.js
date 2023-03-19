const { DB_NAME, DB_HOST, DB_USER, DB_PASS, DB_PORT, DB_DIALECT } = process.env
module.exports = {
    HOST: DB_HOST,
    USER: DB_USER,
    PASSWORD: DB_PASS,
    PORT: DB_PORT,
    DB: DB_NAME,
    dialect: DB_DIALECT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  