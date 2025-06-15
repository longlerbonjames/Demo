'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      total_price: {
        type: Sequelize.FLOAT, // Sửa kiểu dữ liệu thành FLOAT để khớp với model
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER, // Sửa kiểu dữ liệu thành INTEGER để khớp với model
        allowNull: false,
        defaultValue: 0, // Hoặc giá trị mặc định khác nếu cần
      },
      note: {
        type: Sequelize.TEXT, // Thêm trường note vào migration
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("orders");
  },
};
