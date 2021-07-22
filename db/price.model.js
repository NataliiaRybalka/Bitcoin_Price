const { Schema, model } = require('mongoose');

const priceSchema = new Schema({
  date: {
    type: Date
  },
  price: {
    type: Number
  }
});

module.exports = model('Price', priceSchema);
