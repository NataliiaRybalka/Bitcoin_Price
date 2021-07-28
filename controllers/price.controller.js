const { PriceSchema } = require('../db');

module.exports = {
  getPrices: async (req, res, next) => {
    try {
      const rowsToShowPerOnePage = 30;

      const price = await PriceSchema.find({}).skip().limit(rowsToShowPerOnePage);

      res.json(price);
    } catch (e) {
      next(e);
    }
  }
};
