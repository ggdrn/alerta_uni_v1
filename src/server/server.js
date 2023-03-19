// const express = require("express");
// const cors = require("cors");
import path from 'path'
import express from 'express';
import cors from "cors";

const app = express(),DIST_DIR = __dirname,
HTML_FILE = path.join(DIST_DIR, 'index.html')


var corsOptions = {
    origin: "http://localhost:8081"
};

require('dotenv').config({ path: './.env' })

app.use(cors(corsOptions));

app.use(express.static(DIST_DIR));

// parse requests of content-type - application/json
app.use(express.json());

const db = require("/app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.sendFile(HTML_FILE)
    res.json({ message: `Welcome to ${process.env.APP_NAME} application. Version: ${process.env.APP_VERSION}` });
});

// importando as rotas
require("/app/routes/administrador.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});