'use strict';
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Feedback, { foreignKey: 'user_id', as: 'feedbacks' });
      User.hasMany(models.Order, { foreignKey: 'user_id', as: 'orders' });
    }
  }

  User.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.INTEGER, allowNull: false },
    avatar: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true }, // Chuyển từ INTEGER sang STRING để tránh lỗi số điện thoại
  }, { sequelize, modelName: 'User', tableName: 'users', underscored: true });

  return User;
};
