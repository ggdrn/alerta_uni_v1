module.exports = app => {
  const categoria_ocorrencia = require("../controllers/categoria_ocorrencia.controller");

  let router = require("express").Router();

  // Create a new categoria_ocorrencia
  router.post("/criar", categoria_ocorrencia.create);

  // Retrieve all categoria_ocorrencia
  router.get("/listagem", categoria_ocorrencia.findAll);

  // Retrieve all published categoria_ocorrencia
  router.get("/published", categoria_ocorrencia.findAllPublished);

  // Retrieve a single categoria_ocorrencia with id
  router.get("/:id", categoria_ocorrencia.findOne);

  // Update a categoria_ocorrencia with id
  router.put("/:id", categoria_ocorrencia.update);

  // Delete a categoria_ocorrencia with id
  router.delete("/:id", categoria_ocorrencia.delete);

  // Delete all categoria_ocorrencia
  router.delete("/", categoria_ocorrencia.deleteAll);

  app.use('/api/categoria_ocorrencia', router);
};