export default (sequelize, DataTypes) => {
  const Hall = sequelize.define('Hall', {
    cinema_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    capacity: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
    screen_type: { type: DataTypes.ENUM('2D', '3D', 'IMAX', '4DX'), defaultValue: '2D' },
    seat_map: { type: DataTypes.JSON }
  }, {
    tableName: 'halls',
    timestamps: false
  });

  Hall.associate = (models) => {
    Hall.belongsTo(models.Cinema, { foreignKey: 'cinema_id' });
    Hall.hasMany(models.Seat, { foreignKey: 'hall_id' });
    Hall.hasMany(models.Showtime, { foreignKey: 'hall_id' });
  };

  return Hall;
};
