import express from 'express';
import {
  heroCreateInit,
  getHeros,
  getHeroById,
  createHero,
  updateHero,
  deleteHero,
} from '../controllers/heroController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(getHeros)
  .post(protect, admin, heroCreateInit, createHero);
router
  .route('/:id')
  .get(getHeroById)
  .put(protect, admin, updateHero)
  .delete(protect, admin, deleteHero);

export default router;
