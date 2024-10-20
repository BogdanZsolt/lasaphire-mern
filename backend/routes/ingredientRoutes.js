import express from 'express';
import {
  ingredientCreateInit,
  getIngredients,
  getIngredientById,
  createIngredient,
  updateIngredient,
  deleteIngredient,
  getIngredientAlphabet,
} from '../controllers/ingredientController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(getIngredients)
  .post(protect, admin, ingredientCreateInit, createIngredient);
router.route('/alphabetS').get(getIngredientAlphabet);
router
  .route('/:id')
  .get(getIngredientById)
  .put(protect, admin, updateIngredient)
  .delete(protect, admin, deleteIngredient);

export default router;
