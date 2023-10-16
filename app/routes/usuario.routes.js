module.exports = app => {
  const usuario = require("../controllers/usuario.controller");

  let router = require("express").Router();

  // Create a new usuario
  router.post("/criar", usuario.create);

  // Retrieve all usuario
  router.get("/", usuario.findAll);

  router.post("/login", usuario.login);

  router.get("/logout", usuario.logout);

  // Retrieve all published usuario
  router.get("/published", usuario.findAllPublished);

  // Retrieve a single usuario with id
  router.get("perfil/:id", usuario.findOne);

  // Update a usuario with id
  router.put("perfil/:id", usuario.update);

  // Delete a usuario with id
  router.delete("perfil/:id", usuario.delete);

  // Delete all usuario
  router.delete("/", usuario.deleteAll);

  app.use('/api/usuario', router);
};