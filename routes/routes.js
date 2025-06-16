import express from 'express';
import * as AuthController from '../controllers/authController.js';
import * as movieController from '../controllers/movieController.js';
const router = express.Router();

router.get('/now-showing', movieController.getNowShowingMovies);
router.get('/coming-soon', movieController.getComingSoonMovies);
router.get('/search', movieController.searchMovies);

// router.post('/products/UploadImage', uploadMiddleware, uploadImage);

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);


export default router;
