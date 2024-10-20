import asyncHandler from '../middleware/asyncHandler.js';
import { getOne, createOne, getAll, deleteOne } from './handlerFactory.js';
// import APIFeatures from '../utils/apiFeatures.js';
import Ingredient from '../models/ingredientModel.js';

const ingredientsPopOption = [
  { path: 'user', select: ['name'] },
  { path: 'products', select: ['name', 'translations'] },
];
const ingredientPopOption = [
  { path: 'user', select: ['name'] },
  { path: 'products', select: ['name', 'translations'] },
];

const ingredientCreateInit = (req, res, next) => {
  req.body.user = req.user._id;
  req.body.name = 'Simple ingredient';
  req.body.thumbnail = '/images/sample.jpg';
  req.body.description = 'Simple ingredient description';
  req.body.translations = {
    hu: {
      name: 'Egyszerű hatóanyag',
      description: 'Egyszerű hatóanyag leírás',
    },
  };
  next();
};

// @desc    get all ingredients
// @route   GET /api/ingredients
// @access  Public
const getIngredients = getAll(Ingredient, ingredientsPopOption);

// @desc    Get ingredient by ID
// @route   GET /api/ingredients/:id
// @access  Public
const getIngredientById = getOne(Ingredient, ingredientPopOption);

// @desc    Create ingredient
// @route   POST /api/ingredients
// @access  Private/Admin
const createIngredient = createOne(Ingredient);

// @desc    Update ingredient
// @route   PUT /api/ingredients/:id
// @access  Private/Admin
const updateIngredient = asyncHandler(async (req, res) => {
  const ingredient = await Ingredient.findById(req.params.id);
  const { name, thumbnail, description, translations } = req.body;

  if (ingredient) {
    ingredient.name = name || ingredient.name;
    ingredient.thumbnail = thumbnail || ingredient.thumbnail;
    ingredient.description = description || ingredient.description;
    ingredient.translations = translations || ingredient.translations;
    const updatedDoc = await ingredient.save();
    res.status(200).json(updatedDoc);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    delete ingredient
// @route   DELETE /api/ingredients/:id
// @access  Private/Admin
const deleteIngredient = deleteOne(Ingredient);

// @desc    getet initials of the existing active ingredient name
// @route   DELETE /api/ingredients/:id
// @access  Private/Admin
const getIngredientAlphabet = asyncHandler(async (req, res) => {
  try {
    const alphabet = await Ingredient.aggregate([
      { $sort: { name: 1 } },
      {
        $group: {
          _id: null,
          en: { $addToSet: { $substr: ['$name', 0, 1] } },
          hu: { $addToSet: { $substr: ['$translations.hu.name', 0, 1] } },
        },
      },
    ]);
    res.status(200).json(alphabet);
  } catch (err) {
    res.status(404);
    throw new Error('Resource not found');
  }
});

export {
  ingredientCreateInit,
  getIngredients,
  getIngredientById,
  createIngredient,
  updateIngredient,
  deleteIngredient,
  getIngredientAlphabet,
};
