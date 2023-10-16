module.exports = app => {
  const pessoa = require("../controllers/pessoa.controller");

  let router = require("express").Router();

  // Create a new pessoa
  router.post("/criar", pessoa.create);

  // Retrieve all pessoa
  router.get("/", pessoa.findAll);

  // Retrieve all published pessoa
  router.get("/published", pessoa.findAllPublished);

  // Retrieve a single pessoa with id
  router.get("/:id", pessoa.findOne);

  // Update a pessoa with id
  router.put("/:id", pessoa.update);

  // Delete a pessoa with id
  router.delete("/:id", pessoa.delete);

  // Delete all pessoa
  router.delete("/", pessoa.deleteAll);

  app.use('/api/pessoa', router);
};