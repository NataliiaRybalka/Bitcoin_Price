const cron = require('node-cron');

const { IntervalModel } = require('../db');
const createNewPrice = require('./createNewPrice');

let counter = 0;

module.exports = () => {
  cron.schedule('* * * * * *', async () => {
    const interval = await IntervalModel.find({}).sort({ createdAt: -1 }).limit(1);
    counter++;

    if (counter === interval[0].interval) {
      await createNewPrice();
      counter = 0;
    }
  });
};
