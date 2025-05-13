import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema(
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
    isoCode: {
      type: String,
      required: true,
    },
    continent: {
      type: String,
      required: true,
    },
    translations: {
      hu: {
        name: {
          type: String,
        },
        continent: {
          type: String,
        },
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Country = mongoose.model('Country', countrySchema);

export default Country;
