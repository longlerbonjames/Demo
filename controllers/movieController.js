import movieService from "../service/movie.service.js"; 

export const getNowShowingMovies = async (req, res) => {
  try {
    const movies = await movieService.getMoviesByStatus('showing');
    return res.json(movies);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getComingSoonMovies = async (req, res) => {
  try {
    const movies = await movieService.getMoviesByStatus('coming_soon');
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