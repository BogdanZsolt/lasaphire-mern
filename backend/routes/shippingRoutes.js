import express from 'express';
import {
  getShippings,
  getShippingByDestination,
  createShipping,
  updateShipping,
  deleteShipping,
} from '../controllers/shippingController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getShippings).post(protect, admin, createShipping);

router
  .route('/:country')
  .get(getShippingByDestination)
  .put(protect, admin, updateShipping)
  .delete(protect, admin, deleteShipping);

export default router;
