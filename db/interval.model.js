const { Schema, model } = require('mongoose');

const intervalSchema = new Schema({
  interval: {
    type: String
  }
}, { timestamps: true });

module.exports = model('Interval', intervalSchema);
