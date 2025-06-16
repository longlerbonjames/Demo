// models/foodItem.js
export default (sequelize, DataTypes) => {
  const FoodItem = sequelize.define('FoodItem', {
    item_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    category_name: { type: DataTypes.STRING(50), allowNull: false },
    name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    image_url: { type: DataTypes.STRING(255) },
    is_available: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, { tableName: 'food_items', timestamps: false });

  return FoodItem;
};
