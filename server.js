const express = require("express");
const ViteExpress = require("vite-express");
const cors = require('cors')

// import express from "express";
// import cors from "cors"
// import ViteExpress from "vite-express";

const app = express()

var corsOptions = {
    origin: "http://localhost:8081"
};

require('dotenv').config({ path: './.env' })

app.use(cors(corsOptions));

app.use(express.json());

const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: `Welcome to ${process.env.APP_NAME} application. Version: ${process.env.APP_VERSION}` });
});

// importando as rotas
require("./app/routes/administrador.routes")(app);
require("./app/routes/natureza_ocorrencia.routes")(app);
require("./app/routes/categoria_ocorrencia.routes")(app);
require("./app/routes/registro_ocorrencia.routes")(app);

const PORT = process.env.PORT || 8080;
// importando validação global
const validateEntrace = require("./app/utils/validations/index");
module.exports.validateEntrace = validateEntrace; 

ViteExpress.listen(app, PORT, () => console.log("Server is listening..."));