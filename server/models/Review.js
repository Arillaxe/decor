const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const reviewSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    require: true,
  },
  productId: {
    type: ObjectId,
    required: true,
  },
  moderated: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Review', reviewSchema);
