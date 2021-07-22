const router = require('express').Router();

const { priceController } = require('../controllers');

router.get('/', priceController.getPrices);

module.exports = router;
