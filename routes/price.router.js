const router = require('express').Router();

const { intervalController, priceController } = require('../controllers');

router.get('/', priceController.getPrices);

router.post('/', intervalController.selectedInterval);

module.exports = router;
