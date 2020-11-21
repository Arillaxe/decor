const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dimensions: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  bgImage: {
    type: String,
    required: true,
  },
  images: [String],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
