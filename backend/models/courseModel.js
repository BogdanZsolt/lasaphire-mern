import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const courseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
      default: 'Simple course title',
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    currentPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    beforePrice: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'courseCategory',
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: [reviewSchema],
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    translations: {
      hu: {
        title: { type: String },
        description: { type: String, default: 'Egyszerű tanfolyam cím' },
        currentPrice: { type: Number, default: 0 },
        beforePrice: { type: Number, default: 0 },
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Course = mongoose.model('Course', courseSchema);
export default Course;