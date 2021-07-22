const router = require('express').Router();

const { intervalController } = require('../controllers');

router.post('/', intervalController.selectedInterval);

module.exports = router;
