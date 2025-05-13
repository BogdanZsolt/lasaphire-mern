import express from 'express';
import {
  getCountries,
  getCountryByName,
  getCityListOfCountry,
} from '../controllers/countryController.js';

const router = express.Router();

router.route('/').get(getCountries).post(getCityListOfCountry);
router.route('/:country').get(getCountryByName);
router.route('/:country/cities').get(getCityListOfCountry);

export default router;
