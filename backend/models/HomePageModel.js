import mongoose from 'mongoose';

const homePageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
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
  isShowProducts: {
    type: Boolean,
    required: true,
    default: true,
  },
  isShowFeaturedStuff: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const HomePage = mongoose.model('HomePage', homePageSchema);
export default HomePage;
