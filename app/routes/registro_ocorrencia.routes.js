module.exports = app => {
  const registro_ocorrencia = require("../controllers/registro_ocorrencia.controller");

  let router = require("express").Router();

  // Create a new registro_ocorrencia
  router.post("/criar", registro_ocorrencia.create);

  // update a registro_ocorrencia
  router.patch("/atualizar/:uid", registro_ocorrencia.update);

  // change a status registro_ocorrencia
  router.patch("/mudar_status/:uid", registro_ocorrencia.changeStatus);

  // Retrieve all registro_ocorrencia
  router.get("/listagem", registro_ocorrencia.findAll);

  // Retrieve all published registro_ocorrencia
  router.get("/published", registro_ocorrencia.findAllPublished);

  // Retrieve a single registro_ocorrencia with id
  router.get("/detalhes/:uid", registro_ocorrencia.findOne);

  // Retrieve a single registro_ocorrencia with id
  router.get("/detalhes", registro_ocorrencia.findOne);

  // change a status registro_ocorrencia
  router.get("/historico_status/:uid", registro_ocorrencia.findAllStatus);

  // change a status registro_ocorrencia
  router.get("/dashboard/total", registro_ocorrencia.countOcorrencias);

  // Update a registro_ocorrencia with id
  router.put("/:id", registro_ocorrencia.update);

  // Delete a registro_ocorrencia with id
  router.delete("/:id", registro_ocorrencia.delete);

  // Delete all registro_ocorrencia
  router.delete("/", registro_ocorrencia.deleteAll);

  app.use('/api/registro_ocorrencia', router);
};