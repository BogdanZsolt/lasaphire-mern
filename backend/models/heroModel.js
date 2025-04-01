import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    image: {
      type: String,
      required: true,
      default: '/images/sample.jpg',
    },
    title: {
      type: String,
      required: true,
      default: 'Simple hero',
    },
    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },
    description: {
      type: String,
    },
    hasButton: {
      type: Boolean,
      default: true,
    },
    buttonText: {
      type: String,
    },
    buttonUrl: {
      type: String,
    },
    translations: {
      hu: {
        title: { type: String, default: 'Egyszerű hero cím' },
        description: { type: String, default: 'Egyszerű hero leírás' },
        buttonText: String,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Hero = mongoose.model('Hero', heroSchema);
export default Hero;
