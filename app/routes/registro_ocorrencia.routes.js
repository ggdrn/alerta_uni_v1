module.exports = app => {
  const registro_ocorrencia = require("../controllers/registro_ocorrencia.controller");

  let router = require("express").Router();

  // Create a new registro_ocorrencia
  router.post("/criar", registro_ocorrencia.create);

  // Retrieve all registro_ocorrencia
  router.get("/listagem", registro_ocorrencia.findAll);

  // Retrieve all published registro_ocorrencia
  router.get("/published", registro_ocorrencia.findAllPublished);

  // Retrieve a single registro_ocorrencia with id
  router.get("/detalhes/:uid", registro_ocorrencia.findOne);

  // Update a registro_ocorrencia with id
  router.put("/:id", registro_ocorrencia.update);

  // Delete a registro_ocorrencia with id
  router.delete("/:id", registro_ocorrencia.delete);

  // Delete all registro_ocorrencia
  router.delete("/", registro_ocorrencia.deleteAll);

  app.use('/api/registro_ocorrencia', router);
};