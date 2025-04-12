import asyncHandler from '../middleware/asyncHandler.js';
import HomePage from '../models/homePageModel.js';

// @desc    get Home Page config
// @route   GET /api/homepage
// @access  Public
const getHomePage = asyncHandler(async (req, res) => {
  const homePage = await HomePage.findOne().populate('featuredStuff');
  if (homePage) {
    res.status(200).json(homePage);
  } else {
    const doc = new HomePage({
      isShowHero: true,
      heroAutoPlay: true,
      heroAutoplayDelay: 10,
      isShowProducts: true,
      isShowMessage: false,
      message: null,
      isShowFeaturedStuff: false,
      FeaturedStuff: null,
      isShowGallery: true,
      galleryImages: [
        { photo: '/images/manopulcsi-01-450x600.webp', class: 'tail' },
        { photo: '/images/ecoprint-04-200x200.webp', class: '' },
        { photo: '/images/ecoprint-01-200x200.webp', class: 'tail wide' },
        { photo: '/images/ecoprint-07-200x200.webp', class: '' },
        { photo: '/images/ecoprint-06-200x200.webp', class: 'wide' },
        { photo: '/images/ecoprint-02-200x200.webp', class: '' },
        { photo: '/images/manopulcsi-03-450x600.webp', class: 'tail' },
        { photo: '/images/manopulcsi-02-450x600.webp', class: '' },
        { photo: '/images/ecoprint-03-200x200.webp', class: '' },
        { photo: '/images/ecoprint-05-200x200.webp', class: '' },
      ],
    });
    const createdHomePage = await doc.save();
    if (createdHomePage) {
      res.status(200).json(createdHomePage);
    } else {
      res.status(404);
      throw new Error('Config not found');
    }
  }
});

// @desc    Update Home Page config
// @route   PUT /api/homepage
// @access  Private/Admin
const updateHomePage = asyncHandler(async (req, res) => {
  const {
    isShowHero,
    heroAutoPlay,
    heroAutoplayDelay,
    isShowProducts,
    isShowMessage,
    message,
    isShowFeaturedStuff,
    featuredStuff,
    isShowGallery,
    galleryImages,
    translations,
  } = req.body;
  const homePage = await HomePage.findOne();
  if (homePage) {
    homePage.isShowHero =
      isShowHero !== undefined ? isShowHero : homePage.isShowHero;
    homePage.heroAutoPlay =
      heroAutoPlay !== undefined ? heroAutoPlay : homePage.heroAutoPlay;
    homePage.heroAutoplayDelay =
      heroAutoplayDelay !== undefined
        ? heroAutoplayDelay
        : homePage.heroAutoplayDelay;
    homePage.isShowProducts =
      isShowProducts !== undefined ? isShowProducts : homePage.isShowProducts;
    homePage.isShowMessage =
      isShowMessage !== undefined ? isShowMessage : homePage.isShowMessage;
    homePage.message = message !== undefined ? message : homePage.message;
    homePage.isShowFeaturedStuff =
      isShowFeaturedStuff !== undefined
        ? isShowFeaturedStuff
        : homePage.isShowFeaturedStuff;
    homePage.featuredStuff =
      featuredStuff !== undefined ? featuredStuff : homePage.featuredStuff;
    homePage.isShowGallery =
      isShowGallery !== undefined ? isShowGallery : homePage.isShowGallery;
    homePage.galleryImages =
      galleryImages !== undefined ? galleryImages : homePage.galleryImages;
    homePage.translations =
      translations !== undefined ? translations : homePage.translations;
    const updatedHomePage = await homePage.save();
    res.status(200).json(updatedHomePage);
  } else {
    const doc = new HomePage({
      isShowHero: isShowHero !== undefined ? isShowHero : true,
      heroAutoPlay: heroAutoPlay !== undefined ? heroAutoPlay : true,
      heroAutoplayDelay:
        heroAutoplayDelay !== undefined ? heroAutoplayDelay : 10,
      isShowProducts: isShowProducts !== undefined ? isShowProducts : true,
      isShowMessage: isShowMessage !== undefined ? isShowMessage : false,
      message: message !== undefined ? message : null,
      isShowFeaturedStuff:
        isShowFeaturedStuff !== undefined ? isShowFeaturedStuff : false,
      featuredStuff: featuredStuff !== undefined ? featuredStuff : null,
      isShowGallery: isShowGallery !== undefined ? isShowGallery : true,
      galleryImages:
        galleryImages !== undefined
          ? galleryImages
          : [
              { photo: '/images/manopulcsi-01-450x600.webp', class: 'tail' },
              { photo: '/images/ecoprint-04-200x200.webp', class: '' },
              { photo: '/images/ecoprint-01-200x200.webp', class: 'tail wide' },
              { photo: '/images/ecoprint-07-200x200.webp', class: '' },
              { photo: '/images/ecoprint-06-200x200.webp', class: 'wide' },
              { photo: '/images/ecoprint-02-200x200.webp', class: '' },
              { photo: '/images/manopulcsi-03-450x600.webp', class: 'tail' },
              { photo: '/images/manopulcsi-02-450x600.webp', class: '' },
              { photo: '/images/ecoprint-03-200x200.webp', class: '' },
              { photo: '/images/ecoprint-05-200x200.webp', class: '' },
            ],
    });
    const createdHomePage = await doc.save();
    if (doc) {
      res.status(200).json(createdHomePage);
    } else {
      res.status(404);
      throw new Error('Config not found');
    }
  }
});

export { getHomePage, updateHomePage };
