'use strict';
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Customer extends Model {
    static associate(models) {
      Customer.hasMany(models.Order, { foreignKey: 'customer_id', as: 'orders' });
    }
  }

  Customer.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.STRING, allowNull: true }
  }, { sequelize, modelName: 'Customer', tableName: 'customers', underscored: true });

  return Customer;
};
