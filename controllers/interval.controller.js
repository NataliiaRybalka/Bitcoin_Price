const { IntervalModel } = require('../db');

module.exports = {
  selectedInterval: async (req, res, next) => {
    try {
      const { interval } = req.body;

      let time = null;

      if (interval === '1m') {
        time = 1 * 60;
      } else if (interval === '30m') {
        time = 30 * 60;
      } else if (interval === '1h') {
        time = 60 * 60;
      } else if (interval === '1d') {
        time = 24 * 60 * 60;
      }

      const intervalFromDB = await IntervalModel.find({}).sort({ createdAt: -1 }).limit(1);

      if (!intervalFromDB.length) {
        await IntervalModel.create({ interval: time });
        return;
      }

      await IntervalModel.updateOne({ _id: intervalFromDB[0]._id }, { interval: time });

      res.json('OK');
    } catch (e) {
      next(e);
    }
  }
};
