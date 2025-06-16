// models/showtime.js
export default (sequelize, DataTypes) => {
  const Showtime = sequelize.define('Showtime', {
    showtime_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    movie_id: { type: DataTypes.INTEGER, allowNull: false },
    hall_id: { type: DataTypes.INTEGER, allowNull: false },
    start_time: { type: DataTypes.DATE, allowNull: false },
    end_time: { type: DataTypes.DATE, allowNull: false },
    base_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    available_seats: { type: DataTypes.INTEGER, allowNull: false },
    is_full: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, { tableName: 'showtimes', timestamps: false });

  return Showtime;
};
