'use strict';
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class OrderDetail extends Model {
    static associate(models) {
      OrderDetail.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
      OrderDetail.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
    }
  }

  OrderDetail.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    order_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
  }, { sequelize, modelName: 'OrderDetail', tableName: 'order_details', underscored: true });

  return OrderDetail;
};
