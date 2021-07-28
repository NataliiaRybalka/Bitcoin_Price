const { PriceSchema } = require('../db');

module.exports = {
  getPrices: async (req, res, next) => {
    try {
      const fullArray = await PriceSchema.find({});

      const rowsToShowPerOnePage = 30;

      const totalPages = Math.ceil(fullArray.length / rowsToShowPerOnePage);

      const { page, sort } = req.query;
console.log(sort);
      let price;

      if (sort === 'dl') {
        price = await PriceSchema.find({})
          .sort({ date: -1 })
          .skip((page - 1) * rowsToShowPerOnePage)
          .limit(rowsToShowPerOnePage);
      } else if (sort === 'ds') {
        price = await PriceSchema.find({})
          .sort({ date: 1 })
          .skip((page - 1) * rowsToShowPerOnePage)
          .limit(rowsToShowPerOnePage);
      } else if (sort === 'pl') {
        price = await PriceSchema.find({})
          .sort({ price: -1 })
          .skip((page - 1) * rowsToShowPerOnePage)
          .limit(rowsToShowPerOnePage);
      } else if (sort === 'ps') {
        price = await PriceSchema.find({})
          .sort({ price: 1 })
          .skip((page - 1) * rowsToShowPerOnePage)
          .limit(rowsToShowPerOnePage);
      }

      res.json({ totalPages, price });
    } catch (e) {
      next(e);
    }
  }
};
