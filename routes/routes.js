import express from 'express';
import * as AuthController from '../controllers/authController.js';
import * as movieController from '../controllers/movieController.js';
import * as cinemaController from '../controllers/cinemaController.js';
const router = express.Router();

router.get('/movies', movieController.getMoviesByStatus);
router.get('/search', movieController.searchMovies);
router.get('/movies/:id', movieController.detailMovie);
router.get('/showtimes', movieController.getShowtimes);
// router.post('/products/UploadImage', uploadMiddleware, uploadImage);


router.post('/cinemas', cinemaController.createCinema);
router.put('/cinemas/:id', cinemaController.updateCinema);
router.delete('/cinemas/:id', cinemaController.deleteCinema);
router.get('/cinemas/:id', cinemaController.getCinemaById);
router.get('/cinemas', cinemaController.getAllCinemas);


router.post('/register', AuthController.register);
router.post('/login', AuthController.login);


export default router;
