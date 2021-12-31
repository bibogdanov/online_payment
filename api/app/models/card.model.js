module.exports = (sequelize, Sequelize) => {
  const Card = sequelize.define("card", {
    owner_name: {
      type: Sequelize.STRING
    },
    card_number: {
      type: Sequelize.STRING
    },
    cvv: {
      type: Sequelize.INTEGER
    },
    expiration_date: {
      type: Sequelize.DATE
    }
  });

  return Card;
};
