import mongoose from 'mongoose';

const homePageSchema = new mongoose.Schema(
  {
    isShowHero: {
      type: Boolean,
      required: true,
      default: true,
    },
    heroAutoPlay: {
      type: Boolean,
      required: true,
      default: true,
    },
    heroAutoplayDelay: {
      type: Number,
      required: true,
      default: 10,
    },
    isShowProducts: {
      type: Boolean,
      required: true,
      default: true,
    },
    isShowMessage: {
      type: Boolean,
      required: true,
      default: false,
    },
    message: {
      type: String,
      default: null,
    },
    isShowFeaturedStuff: {
      type: Boolean,
      required: true,
      default: true,
    },
    featuredStuff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    isShowGallery: {
      type: Boolean,
      required: true,
      default: true,
    },
    galleryImages: [
      {
        photo: String,
        class: String,
        title: String,
        description: String,
        link: String,
        translations: {
          hu: {
            title: String,
            description: String,
          },
        },
      },
    ],
    translations: {
      hu: {
        message: String,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const HomePage = mongoose.model('HomePage', homePageSchema);
export default HomePage;
