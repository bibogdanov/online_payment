module.exports = app => {
  const cards = require("../controllers/card.controller.js");

  var router = require("express").Router();

  // Create a new card
  router.post("/", cards.create);

  // Retrieve all cards
  router.get("/", cards.findAll);

  // Retrieve a single card with id
  router.get("/:id", cards.findOne);

  // Update a card with id
  router.put("/:id", cards.update);

  // Delete a card with id
  router.delete("/:id", cards.delete);

  // Delete all cards
  router.delete("/", cards.deleteAll);

  app.use('/api/cards', router);
};
