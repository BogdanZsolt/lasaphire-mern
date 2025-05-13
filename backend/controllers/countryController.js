import asyncHandler from '../middleware/asyncHandler.js';
import { getAll } from './handlerFactory.js';
import Country from '../models/countryModel.js';
import axios from 'axios';

const API_URL = 'https://countriesnow.space/api/v0.1';
const countryPopOption = [{ path: 'user', select: 'name' }];

// @desc    get country list
// @route   GET /api/countries
// @access  Public
const getCountries = getAll(Country, countryPopOption);

// @desc    get country by name
// @route   GET /api/countries
// @access  Public
const getCountryByName = asyncHandler(async (req, res) => {
  console.log(req.params);

  let query = Country.find({ name: req.params.country });

  if (countryPopOption) query = query.select().populate(countryPopOption);
  const doc = await query;

  if (doc) {
    return res.status(200).json(doc);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    get city list of country
// @route   get /api/countries/:country/cities
// @access  Public
const getCityListOfCountry = asyncHandler(async (req, res) => {
  try {
    const { country } = req.params;
    const data = {
      country: country,
    };

    const url = `${API_URL}/countries/cities`;
    const response = await axios.post(url, data);
    if (response.data && !response.error) {
      res.status(200).json(response.data);
    }
  } catch (err) {
    res.status(404);
    throw new Error('Resource not found');
  }
});

export { getCountries, getCityListOfCountry, getCountryByName };
