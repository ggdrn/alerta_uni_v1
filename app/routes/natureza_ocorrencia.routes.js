module.exports = app => {
  const natureza_ocorrencia = require("../controllers/natureza_ocorrencia.controller");

  let router = require("express").Router();

  // Create a new natureza_ocorrencia
  router.post("/criar", natureza_ocorrencia.create);

  // Retrieve all natureza_ocorrencia
  router.get("/listagem", natureza_ocorrencia.findAll);

  // Retrieve all published natureza_ocorrencia
  router.get("/published", natureza_ocorrencia.findAllPublished);

  // Retrieve a single natureza_ocorrencia with id
  router.get("/:uid", natureza_ocorrencia.findOne);

  // Update a natureza_ocorrencia with id
  router.put("/:uid", natureza_ocorrencia.update);

  // Delete a natureza_ocorrencia with id
  router.delete("/:uid", natureza_ocorrencia.delete);

  // Delete all natureza_ocorrencia
  router.delete("/", natureza_ocorrencia.deleteAll);

  app.use('/api/natureza_ocorrencia', router);
};