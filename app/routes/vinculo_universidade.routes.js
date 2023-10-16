module.exports = app => {
  const vinculo_universidade = require("../controllers/vinculo_universidade.controller");

  let router = require("express").Router();

  // Create a new vinculo_universidade
  router.post("/criar", vinculo_universidade.create);

  // Retrieve all vinculo_universidade
  router.get("/", vinculo_universidade.findAll);

  // Retrieve all published vinculo_universidade
  router.get("/published", vinculo_universidade.findAllPublished);

  // Retrieve a single vinculo_universidade with id
  router.get("/:id", vinculo_universidade.findOne);

  // Update a vinculo_universidade with id
  router.put("/:id", vinculo_universidade.update);

  // Delete a vinculo_universidade with id
  router.delete("/:id", vinculo_universidade.delete);

  // Delete all vinculo_universidade
  router.delete("/", vinculo_universidade.deleteAll);

  app.use('/api/vinculo_universidade', router);
};