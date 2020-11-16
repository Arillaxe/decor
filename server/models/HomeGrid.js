const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const homeGridSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  products: {
    type: [ObjectId],
    required: true,
  },
});

module.exports = mongoose.model('HomeGrid', homeGridSchema);
