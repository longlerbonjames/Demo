export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    full_name: { type: DataTypes.STRING },
    phone_number: { type: DataTypes.STRING },
    avatar_url: { type: DataTypes.STRING },
    role: { type: DataTypes.ENUM('admin', 'staff', 'customer'), defaultValue: 'customer' },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'users',
    timestamps: false
  });

  User.associate = (models) => {
    User.hasMany(models.Booking, { foreignKey: 'user_id' });
    User.hasMany(models.Review, { foreignKey: 'user_id' });
  };

  return User;
};
