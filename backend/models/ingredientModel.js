import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema(
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
    thumbnail: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    translations: {
      hu: {
        name: { type: String },
        description: { type: String },
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ingredientSchema.pre('save', function (next) {
  // capitalize
  this.name =
    this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase();
  if (this.translations.hu.name) {
    this.translations.hu.name =
      this.translations.hu.name.charAt(0).toUpperCase() +
      this.translations.hu.name.slice(1).toLowerCase();
  }
  next();
});

ingredientSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'ingredients',
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

export default Ingredient;
