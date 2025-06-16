import { Op } from 'sequelize';
import db from '../models/index.js';

const getMoviesByStatus = async (status) => {
  const movies = await db.Movie.scope().sequelize.query(
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


export default { getMoviesByStatus,searchMovies };
