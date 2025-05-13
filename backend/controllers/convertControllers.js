import asyncHandler from '../middleware/asyncHandler.js';
import axios from 'axios';

const API_URL = 'https://v6.exchangerate-api.com/v6';
const API_KEY = process.env.EXCHANGE_RATE_API_KEY;

// @desc    Converts a given amount of currency into another currency
// @route   POST /api/convert
// @access  Public
const convertCurrency = asyncHandler(async (req, res) => {
  const { from, to, amount } = req.body;

  try {
    const url = `${API_URL}/${API_KEY}/pair/${from}/${to}/${amount}`;
    const response = await axios.get(url);
    if (response.data && response.data.result === 'success') {
      res.status(response.status).json({
        base: from,
        target: to,
        conversionRate: response.data.conversion_rate,
        convertedAmount: response.data.conversion_result,
      });
    } else {
      throw new Error('Error converting currency');
    }
  } catch (err) {
    res.status(404);
    throw new Error('Resource not found');
  }
});

export { convertCurrency };
