// models/promotion.js
export default (sequelize, DataTypes) => {
  const Promotion = sequelize.define('Promotion', {
    promotion_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    code: { type: DataTypes.STRING(20), unique: true, allowNull: false },
    description: { type: DataTypes.TEXT },
    discount_type: { type: DataTypes.ENUM('percentage', 'fixed'), allowNull: false },
    discount_value: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    min_order_amount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    start_date: { type: DataTypes.DATE, allowNull: false },
    end_date: { type: DataTypes.DATE, allowNull: false },
    max_uses: { type: DataTypes.INTEGER },
    current_uses: { type: DataTypes.INTEGER, defaultValue: 0 },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, { tableName: 'promotions', timestamps: false });

  return Promotion;
};
