'use strict';
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Feedback extends Model {
    static associate(models) {
      Feedback.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
      Feedback.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
  }

  Feedback.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    star: { type: DataTypes.INTEGER, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: true },
  }, { sequelize, modelName: 'Feedback', tableName: 'feedbacks', underscored: true });

  return Feedback;
};
