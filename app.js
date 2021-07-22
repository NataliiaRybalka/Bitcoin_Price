require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const { envConstants: { PORT, MONGOOSE_CONNECTION } } = require('./constants');
const cronRun = require('./cron-jobs');
const { intervalRouter, priceRouter } = require('./routes');

const app = express();

(() => {
  mongoose.connect(MONGOOSE_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
})();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/interval', intervalRouter);
app.use('/', priceRouter);

app.listen(PORT, () => {
  console.log(`App listen ${PORT}`);
  cronRun();
});
