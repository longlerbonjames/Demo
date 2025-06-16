export default (sequelize, DataTypes) => {
  const Cinema = sequelize.define('Cinema', {
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.TEXT, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    contact_number: { type: DataTypes.STRING },
    google_maps_url: { type: DataTypes.STRING },
    opening_hours: { type: DataTypes.STRING }
  }, {
    tableName: 'cinemas',
    timestamps: false
  });

  Cinema.associate = (models) => {
    Cinema.hasMany(models.Hall, { foreignKey: 'cinema_id' });
  };

  return Cinema;
};
