'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("orders", "customer_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "customers", // Đổi thành bảng chứa khách hàng của bạn
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("orders", "customer_id");
  },
};
