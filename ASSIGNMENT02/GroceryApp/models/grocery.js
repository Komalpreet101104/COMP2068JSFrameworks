var mongoose = require('mongoose');

var grocerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Grocery', grocerySchema);
