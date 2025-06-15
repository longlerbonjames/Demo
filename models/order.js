'use strict';
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Order.belongsTo(models.Customer, { foreignKey: 'customer_id', as: 'customer' }); // Thêm quan hệ với Customer
      // Order.hasMany(models.OrderDetail, { foreignKey: 'order_id', as: 'order_details' });
    }
  }

  Order.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: true }, // Có thể null nếu đơn hàng không do user tạo
    customer_id: { type: DataTypes.INTEGER, allowNull: false }, // Thêm cột customer_id
    status: { type: DataTypes.INTEGER, allowNull: false },
    note: { type: DataTypes.TEXT, allowNull: true },
    total_price: { type: DataTypes.FLOAT, allowNull: false },
  }, { sequelize, modelName: 'Order', tableName: 'orders', underscored: true });

  return Order;
};
