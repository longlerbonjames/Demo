// models/movie.js
export default (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    movie_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.TEXT },
    duration_minutes: { type: DataTypes.SMALLINT.UNSIGNED },
    release_date: { type: DataTypes.DATE },
    end_date: { type: DataTypes.DATE },
    genre: { type: DataTypes.STRING(50) },
    director: { type: DataTypes.STRING(100) },
    cast: { type: DataTypes.JSON },
    poster_url: { type: DataTypes.STRING(255) },
    trailer_url: { type: DataTypes.STRING(255) },
    rating: { type: DataTypes.DECIMAL(3, 1).UNSIGNED, defaultValue: 0.0 },
    display_status: { type: DataTypes.ENUM('showing', 'coming_soon', 'hidden'), defaultValue: 'coming_soon' },
  }, { tableName: 'movies', timestamps: false });
  return Movie;
};
