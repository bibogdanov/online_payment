const db = require("../models");
const Card = db.cards;
const Op = db.Sequelize.Op;

// Create and Save a new card
exports.create = (req, res) => {
  // Validate request
  if (!req.body.owner_name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a card
  const card = {
    owner_name: req.body.owner_name,
    card_number: req.body.card_number,
    cvv: req.body.cvv,
    expiration_date: req.body.expiration_date,

  };

  // Save card in the database
  Card.create(card)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the card."
      });
    });
};

// Retrieve all cards from the database.
exports.findAll = (req, res) => {
  const owner_name = req.query.owner_name;
  var condition = owner_name ? { owner_name: { [Op.like]: `%${owner_name}%` } } : null;

  Card.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cards."
      });
    });
};

// Find a single card with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Card.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving card with id=" + id
      });
    });
};

// Update a card by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Card.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "card was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update card with id=${id}. Maybe card was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating card with id=" + id
      });
    });
};

// Delete a card with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Card.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "card was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete card with id=${id}. Maybe card was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete card with id=" + id
      });
    });
};

// Delete all cards from the database.
exports.deleteAll = (req, res) => {
  Card.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} cards were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all cards."
      });
    });
};
