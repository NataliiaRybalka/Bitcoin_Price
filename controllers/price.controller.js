const { PriceSchema } = require('../db');

module.exports = {
  getPrices: async (req, res, next) => {
    try {
      const price = await PriceSchema.find({});

      res.json(price);
    } catch (e) {
      next(e);
    }
  }
};
