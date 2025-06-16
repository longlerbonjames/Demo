// models/bookingSeat.js
export default (sequelize, DataTypes) => {
  const BookingSeat = sequelize.define('BookingSeat', {
    booking_seat_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    booking_id: { type: DataTypes.INTEGER, allowNull: false },
    seat_id: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
  }, { tableName: 'booking_seats', timestamps: false });

  return BookingSeat;
};
