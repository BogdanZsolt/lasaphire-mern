import express from 'express';
import { convertCurrency } from '../controllers/convertControllers.js';

const router = express.Router();

router.route('/').post(convertCurrency);

export default router;
