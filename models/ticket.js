// models/ticket.js
export default (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    ticket_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    booking_id: { type: DataTypes.INTEGER, allowNull: false },
    seat_id: { type: DataTypes.INTEGER, allowNull: false },
    ticket_code: { type: DataTypes.STRING(20), unique: true, allowNull: false },
    ticket_type: { type: DataTypes.ENUM('standard', 'student', 'child', 'senior'), defaultValue: 'standard' },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: { type: DataTypes.ENUM('active', 'used', 'cancelled'), defaultValue: 'active' },
    checkin_time: { type: DataTypes.DATE }
  }, { tableName: 'tickets', timestamps: false });

  return Ticket;
};
