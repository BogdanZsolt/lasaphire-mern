import express from 'express';
import {
  getHomePage,
  updateHomePage,
} from '../controllers/homePageController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getHomePage).put(protect, admin, updateHomePage);

export default router;
