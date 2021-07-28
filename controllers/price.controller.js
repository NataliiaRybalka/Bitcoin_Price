const { PriceSchema } = require('../db');

module.exports = {
  getPrices: async (req, res, next) => {
    try {
      const fullArray = await PriceSchema.find({});

      const rowsToShowPerOnePage = 30;

      const totalPages = Math.ceil(fullArray.length / rowsToShowPerOnePage);

      const { page, sortParam, sortDirection } = req.query;

      let price = await PriceSchema.find({})
        .sort({ date: -1 })
        .skip((page - 1) * rowsToShowPerOnePage)
        .limit(rowsToShowPerOnePage);

      if (sortParam === 'date') {
        if (sortDirection === 'smallerTop') {
          price = await PriceSchema.find({})
            .sort({ date: 1 })
            .skip((page - 1) * rowsToShowPerOnePage)
            .limit(rowsToShowPerOnePage);
        }
      } else if (sortParam === 'price') {
        if (sortDirection === 'largerTop') {
          price = await PriceSchema.find({})
            .sort({ price: -1 })
            .skip((page - 1) * rowsToShowPerOnePage)
            .limit(rowsToShowPerOnePage);
        } else if (sortDirection === 'smallerTop') {
          price = await PriceSchema.find({})
            .sort({ price: 1 })
            .skip((page - 1) * rowsToShowPerOnePage)
            .limit(rowsToShowPerOnePage);
        }
      }

      res.json({ totalPages, price });
    } catch (e) {
      next(e);
    }
  }
};
