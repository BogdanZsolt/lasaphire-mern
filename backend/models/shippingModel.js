import mongoose from 'mongoose';

const shippingSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
      unique: true,
    },
    price: Number,
    freeFrom: Number,
    translations: {
      hu: {
        price: Number,
        freeFrom: Number,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

shippingSchema.virtual('countryInfo', {
  ref: 'Country',
  localField: 'country',
  foreignField: 'name',
});

const Shipping = mongoose.model('Shipping', shippingSchema);

export default Shipping;
