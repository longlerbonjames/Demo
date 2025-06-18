import { MovieStatus } from "../enum/status.enum.js";
import movieService from "../service/movie.service.js"; 

export const getMoviesByStatus = async (req, res) => {
  try {
    const { status } = req.query;

    if (!Object.values(MovieStatus).includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const movies = await movieService.getMoviesByStatus(status);
    return res.json(movies);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const searchMovies = async (req, res) => {
  try {
    const { title, genre } = req.query;
    const movies = await movieService.searchMovies(title, genre);
    return res.json(movies);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const detailMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await movieService.detailMovie(id);
    return res.json(movie);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getShowtimes = async (req, res) => {
  try {
    const { date, cinema_id } = req.query;
    const showtimes = await movieService.getShowtimesByDateAndCinema(date, cinema_id);

    return res.status(200).json(showtimes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};