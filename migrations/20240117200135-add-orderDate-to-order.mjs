'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Order', 'orderDate', {
      type: Sequelize.DATE,
      allowNull: true, // Puedes cambiar esto según tus requerimientoss
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Order', 'orderDate');
  },
}