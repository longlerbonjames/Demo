// models/transaction.js
export default (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    transaction_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    booking_id: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    payment_method: { type: DataTypes.ENUM('cash', 'credit_card', 'momo', 'zalopay', 'bank_transfer'), allowNull: false },
    payment_status: { type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'), defaultValue: 'pending' },
    transaction_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    gateway_response: { type: DataTypes.JSON }
  }, { tableName: 'transactions', timestamps: false });

  return Transaction;
};
