'use strict';

/** @type {import('sequelize-cli').Migration} */

'use strict';

module.exports = {
  up: async function (queryInterface, Sequelize) {
    await queryInterface.createTable('notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'normal'
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });

    // Agrega las restricciones y relaciones necesarias aquí

  },

  down: async function (queryInterface, Sequelize) {
    await queryInterface.dropTable('notifications');
    // Agrega las acciones para revertir las restricciones y relaciones aquí
  }
};


