const { Schema, model } = require('mongoose');

const intervalSchema = new Schema({
  interval: {
    type: Number
  }
}, { timestamps: true });

module.exports = model('Interval', intervalSchema);
