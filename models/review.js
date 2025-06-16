// models/review.js
export default (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    review_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    movie_id: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false },
    comment: { type: DataTypes.TEXT },
    review_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, { tableName: 'reviews', timestamps: false });

  return Review;
};
