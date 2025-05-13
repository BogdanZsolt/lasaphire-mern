import asyncHandler from '../middleware/asyncHandler.js';
import Shipping from '../models/shippingModel.js';
import APIFeatures from '../utils/apiFeatures.js';

const shippingsPopOption = [
  { path: 'countryInfo', select: ['translations', 'isoCode', 'continent'] },
];

// @desc    get Shippings
// @route   GET /api/shippings
// @access  Public
const getShippings = asyncHandler(async (req, res) => {
  const features = new APIFeatures(
    Shipping.find(),
    req.query,
    shippingsPopOption
  )
    .filter()
    .sort()
    .limit()
    .limitFields()
    .paginate()
    .populate();
  // const shippings = await Shipping.find();
  const shippings = await features.query;
  if (shippings.length > 0) {
    res.status(200).json(shippings);
  } else {
    const doc = new Shipping({
      country: 'Hungary',
      price: 10,
      freeFrom: 110,
      translations: {
        hu: {
          price: 1900,
          freeFrom: 20000,
        },
      },
    });
    const createdShipping = await doc.save();
    if (createdShipping) {
      const getNewShippings = new APIFeatures(
        Shipping.find(),
        req.query,
        shippingsPopOption
      )
        .filter()
        .sort()
        .limit()
        .limitFields()
        .paginate()
        .populate();
      const shippings = getNewShippings.query();
      res.status(200).json(shippings);
    } else {
      res.status(404);
      throw new Error('Config not found');
    }
  }
});

// @desc    get Shippings
// @route   GET /api/shippings/:country
// @access  Public
const getShippingByDestination = asyncHandler(async (req, res) => {
  const country = req.params.country;

  const shipping = await Shipping.findOne({ country }).populate(
    shippingsPopOption
  );

  if (shipping) {
    res.status(200).json(shipping);
  } else {
    res.status(404);
    throw new Error('resource not found');
  }
});

// @desc    Create Shipping destination
// @route   POST /api/shippings
// @access  Private/Admin
const createShipping = asyncHandler(async (req, res) => {
  const { country, price, freeFrom, translations } = req.body;
  const shipping = await Shipping.findOne({ country });

  if (shipping) {
    res.status(400);
    throw new Error('Delivery destination already exists.');
  }

  const doc = new Shipping({
    country: country,
    price: price || 10,
    freeFrom: freeFrom || 110,
    translations: {
      hu: {
        price: translations?.hu?.price || 1900,
        freeFrom: translations?.hu?.freeFrom || 20000,
      },
    },
  });
  const createdShipping = await doc.save();
  if (createdShipping) {
    res.status(200).json(createdShipping);
  } else {
    res.status(404);
    throw new Error('resource not found');
  }
});

// @desc    Update Shipping destination
// @route   PUT /api/shippings/:country
// @access  Private/Admin
const updateShipping = asyncHandler(async (req, res) => {
  const country = req.params.country;
  const { price, freeFrom, translations } = req.body;
  const shipping = await Shipping.findOne({ country });
  if (shipping) {
    shipping.price = price;
    shipping.freeFrom = freeFrom;
    shipping.translations.hu.price = translations?.hu?.price;
    shipping.translations.hu.freeFrom = translations?.hu?.freeFrom;
    const updatedShipping = await shipping.save();
    res.status(200).json(updatedShipping);
  } else {
    res.status(404);
    throw new Error('resource not found');
  }
});

// @desc    Delete Shipping destination
// @route   DELETE /api/shippings/:country
// @access  Private/Admin
const deleteShipping = asyncHandler(async (req, res) => {
  const country = req.params.country;

  const shipping = await Shipping.findOne({ country });
  if (shipping) {
    await Shipping.deleteOne({ country });
    res.status(200).json({ message: 'Shipping destination deleted' });
  } else {
    res.status(404);
    throw new Error('resource not found');
  }
});

export {
  getShippings,
  getShippingByDestination,
  createShipping,
  updateShipping,
  deleteShipping,
};
