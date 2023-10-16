module.exports = app => {
  const tipo_vinculo = require("../controllers/tipo_vinculo.controller");

  let router = require("express").Router();

  // Create a new tipo_vinculo
  router.post("/criar", tipo_vinculo.create);

  // Retrieve all tipo_vinculo
  router.get("/", tipo_vinculo.findAll);

  // Retrieve all published tipo_vinculo
  router.get("/published", tipo_vinculo.findAllPublished);

  // Retrieve a single tipo_vinculo with id
  router.get("/:id", tipo_vinculo.findOne);

  // Update a tipo_vinculo with id
  router.put("/:id", tipo_vinculo.update);

  // Delete a tipo_vinculo with id
  router.delete("/:id", tipo_vinculo.delete);

  // Delete all tipo_vinculo
  router.delete("/", tipo_vinculo.deleteAll);

  app.use('/api/tipo_vinculo', router);
};