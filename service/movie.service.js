import { Op, where } from 'sequelize';
import db from '../models/index.js';
import sequelize from '../config/database.js';

export const getMoviesByStatus = async (status) => {
  const movies = await db.sequelize.query(
    `SELECT * FROM movies WHERE display_status = :status ORDER BY release_date ASC`,
    {
      replacements: { status },
      type: db.Sequelize.QueryTypes.SELECT
    }
  );
  return movies;  
};

const searchMovies = async (title, genre) => {
  const whereClause = {};
  if (title) {
    whereClause.title = { [Op.like]: `%${title}%` };
  }

  if (genre) {
    whereClause.genre = { [Op.like]: `%${genre}%` };
  }

  const movies = await db.Movie.findAll({
    where: whereClause,
    order: [['release_date', 'ASC']] 
  });
  return movies;
};

const detailMovie = async (id) => {
  const foundMovie = await db.Movie.findByPk(id);
  if (!foundMovie) {
    throw new Error('Movie not found');
  }
  return foundMovie;
};

export const getShowtimesByDateAndCinema = async (date, cinemaId) => {
  let query = `
    SELECT s.*, m.title, m.poster_url, h.name AS hall_name, c.name AS cinema_name, c.address, c.cinema_id
    FROM showtimes s
    JOIN movies m ON s.movie_id = m.movie_id
    JOIN halls h ON s.hall_id = h.hall_id
    JOIN cinemas c ON h.cinema_id = c.cinema_id
    WHERE 1 = 1
  `;
  const replacements = {};

  if (date) {
    query += ` AND DATE(s.start_time) = :date`;
    replacements.date = date;
  }

  if (cinemaId) {
    query += ` AND c.cinema_id = :cinemaId`;
    replacements.cinemaId = cinemaId;
  }

  query += ` ORDER BY s.start_time ASC`;

  const results = await sequelize.query(query, {
    replacements,
    type: sequelize.QueryTypes.SELECT
  });

const formattedShowtimes = results.map(item => ({
  showtimeId: item.showtime_id,
  startTime: item.start_time,
  endTime: item.end_time,
  basePrice: item.base_price,
  isFull: item.is_full,
  movie: {
    movieId: item.movie_id,
    title: item.title,
    posterUrl: item.poster_url
  },
  hall: {
    hallId: item.hall_id,
    name: item.hall_name
  },
  cinema: {
    cinemaId: item.cinema_id,
    name: item.cinema_name,
    address: item.address
  }
}));

  return formattedShowtimes;
};

export default { getMoviesByStatus, searchMovies, detailMovie, getShowtimesByDateAndCinema };
