'use strict';
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Brand, { as: 'brand', foreignKey: 'brand_id' });
      Product.belongsTo(models.Category, { as: 'category', foreignKey: 'category_id' });
      Product.hasMany(models.Feedback, { as: 'feedbacks', foreignKey: 'product_id' });
    }
  }

  Product.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    oldprice: { type: DataTypes.INTEGER, allowNull: true },
    image: { type: DataTypes.TEXT, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    buyturn: { type: DataTypes.INTEGER, defaultValue: 0 },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    brand_id: { type: DataTypes.INTEGER, allowNull: false },
    category_id: { type: DataTypes.INTEGER, allowNull: false },
  }, { sequelize, modelName: 'Product', tableName: 'products', underscored: true });

  return Product;
};
