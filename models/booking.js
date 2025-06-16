// models/booking.js
export default (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    booking_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    showtime_id: { type: DataTypes.INTEGER, allowNull: false },
    booking_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    total_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: { type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'), defaultValue: 'pending' },
    promotion_id: { type: DataTypes.INTEGER },
    food_items: { type: DataTypes.JSON },
    movie_title: { type: DataTypes.STRING(100) },
    cinema_name: { type: DataTypes.STRING(100) },
    hall_name: { type: DataTypes.STRING(50) },
    show_start_time: { type: DataTypes.DATE }
  }, { tableName: 'bookings', timestamps: false });

  return Booking;
};
