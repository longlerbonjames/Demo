'use strict';
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
    class Brand extends Model {
      static associate(models) {
        Brand.hasMany(models.Product, { foreignKey: 'brand_id', as: 'products' });
      }
    }
    Brand.init({
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      image: { type: DataTypes.TEXT, allowNull: true },
    }, { sequelize, modelName: 'Brand', tableName: 'brands', underscored: true });
    return Brand;
};
