module.exports = app => {
  const item_subtraido = require("../controllers/item_subtraido.controller");

  let router = require("express").Router();

  // Create a new item_subtraido
  router.post("/", item_subtraido.create);

  // Retrieve all item_subtraido
  router.get("/", item_subtraido.findAll);

  // Retrieve all published item_subtraido
  router.get("/published", item_subtraido.findAllPublished);

  // Retrieve a single item_subtraido with id
  router.get("/:id", item_subtraido.findOne);

  // Update a item_subtraido with id
  router.put("/:id", item_subtraido.update);

  // Delete a item_subtraido with id
  router.delete("/:id", item_subtraido.delete);

  // Delete all item_subtraido
  router.delete("/", item_subtraido.deleteAll);

  app.use('/api/item_subtraido', router);
};