module.exports = app => {
  const administrador = require("../controllers/administrador.controller");

  let router = require("express").Router();

  // Create a new administrador
  router.post("/criar", administrador.create);

  // Retrieve all administrador
  router.get("/listagem", administrador.findAll);

  // Retrieve all published administrador
  router.get("/published", administrador.findAllPublished);

  // Retrieve a single administrador with id
  router.get("/:id", administrador.findOne);

  // Update a administrador with id
  router.put("/:id", administrador.update);

  // Delete a administrador with id
  router.delete("/:id", administrador.delete);

  // Delete all administrador
  router.delete("/", administrador.deleteAll);

  app.use('/api/administrador', router);
};