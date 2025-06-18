import express from 'express';
import * as AuthController from '../controllers/authController.js';
import * as movieController from '../controllers/movieController.js';
const router = express.Router();

router.get('/movies', movieController.getMoviesByStatus);
router.get('/search', movieController.searchMovies);
router.get('/movies/:id', movieController.detailMovie);
router.get('/showtimes', movieController.getShowtimes);
// router.post('/products/UploadImage', uploadMiddleware, uploadImage);

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);


export default router;
