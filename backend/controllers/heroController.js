import asyncHandler from '../middleware/asyncHandler.js';
import { getOne, getAll, createOne, deleteOne } from './handlerFactory.js';
import Hero from '../models/heroModel.js';

const herosPopOption = [{ path: 'user', select: ['name'] }];
const heroPopOption = [{ path: 'user', select: ['name'] }];

const heroCreateInit = (req, res, next) => {
  req.body.user = req.user._id;
  req.body.image = '/images/sample.jpg';
  req.body.title = 'Simple hero';
  req.body.description = 'Simple description';
  req.body.isActive = false;
  req.body.hasButton = true;
  req.body.buttonText = 'continue';
  req.body.translations = {
    hu: {
      title: 'Egyszerű hero cím',
      description: 'Egyszerű hero leírás',
      buttonText: 'tovább',
    },
  };
  next();
};

// @desc    get all heros
// @route   GET /api/heros
// @access  Public
const getHeros = getAll(Hero, herosPopOption);

// @desc    Get hero by ID
// @route   GET /api/heros/:id
// @access  Public
const getHeroById = getOne(Hero, heroPopOption);

// @desc    Create ingredient
// @route   POST /api/ingredients
// @access  Private/Admin
const createHero = createOne(Hero);

// @desc    Update hero
// @route   PUT /api/heros/:id
// @access  Private/Admin
const updateHero = asyncHandler(async (req, res) => {
  const hero = await Hero.findById(req.params.id);
  const {
    image,
    title,
    description,
    isActive,
    hasButton,
    buttonText,
    buttonUrl,
    translations,
  } = req.body;

  if (hero) {
    hero.title = title || hero.title;
    hero.image = image || hero.image;
    hero.description = description || hero.description;
    hero.isActive = isActive;
    hero.hasButton = hasButton;
    hero.buttonText = buttonText || hero.buttonText;
    hero.buttonUrl = buttonUrl || hero.buttonUrl;
    hero.translations = translations || hero.translations;
    const updatedDoc = await hero.save();
    res.status(200).json(updatedDoc);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    delete hero
// @route   DELETE /api/heros/:id
// @access  Private/Admin
const deleteHero = deleteOne(Hero);

export {
  heroCreateInit,
  getHeros,
  getHeroById,
  createHero,
  updateHero,
  deleteHero,
};
