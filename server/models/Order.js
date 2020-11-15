const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: String,
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  comment: String,
  products: {
    type: [ObjectId],
    required: true,
  },
});

module.exports = mongoose.model('Order', orderSchema);
