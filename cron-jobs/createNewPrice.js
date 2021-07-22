const request = require('request-promise');

const {
  constants: { HTTP },
  envConstants: { API_KEY }
} = require('../constants');
const { PriceSchema } = require('../db');

module.exports = () => {
  const requestOptions = {
    method: 'GET',
    uri: HTTP,
    headers: {
      'X-CMC_PRO_API_KEY': API_KEY
    },
    json: true,
    gzip: true
  };

  request(requestOptions).then((response) => {
    PriceSchema.create({ date: response.status.timestamp, price: response.data[1].quote.USD.price });
  }).catch((err) => {
    console.log('API call error:', err.message);
  });
};
