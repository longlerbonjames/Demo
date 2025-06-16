export default (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    duration_minutes: { type: DataTypes.SMALLINT.UNSIGNED },
    release_date: { type: DataTypes.DATE },
    end_date: { type: DataTypes.DATE },
    genre: { type: DataTypes.STRING },
    director: { type: DataTypes.STRING },
    cast: { type: DataTypes.JSON },
    poster_url: { type: DataTypes.STRING },
    trailer_url: { type: DataTypes.STRING },
    rating: { type: DataTypes.DECIMAL(3, 1).UNSIGNED, defaultValue: 0.0 },
    display_status: { type: DataTypes.ENUM('showing', 'coming_soon', 'hidden'), defaultValue: 'coming_soon' },
    total_bookings: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
    avg_rating: { type: DataTypes.DECIMAL(3, 1), defaultValue: 0.0 }
  }, {
    tableName: 'movies',
    timestamps: false
  });

  Movie.associate = (models) => {
    Movie.hasMany(models.Showtime, { foreignKey: 'movie_id' });
    Movie.hasMany(models.Review, { foreignKey: 'movie_id' });
  };

  return Movie;
};
