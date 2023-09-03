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
    console.log('Tabelas criadas no banco de dados.');
  })
  .catch((err) => {
    console.error('Erro ao criar tabelas:', err.message);
  });

app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: `Welcome to ${process.env.APP_NAME} application. Version: ${process.env.APP_VERSION}` });
});

// importando as rotas
require("./app/routes/administrador.routes")(app);
require("./app/routes/pessoa.routes")(app);
require("./app/routes/item_subtraido.routes")(app);
require("./app/routes/natureza_ocorrencia.routes")(app);
require("./app/routes/categoria_ocorrencia.routes")(app);
require("./app/routes/registro_ocorrencia.routes")(app);

const PORT = process.env.PORT || 8080;

ViteExpress.listen(app, PORT, () => console.log("Server is listening..."));