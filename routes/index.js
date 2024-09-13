const express = require('express');
const debug = require('debug')('app:routes:index');
const router = express.Router();
const v1 = require('./v1');
const HealthCheckController = require('../controllers/healthCheck');
const blockchain = require('./blockchain');

debug('Configuring routes');

//Health check
router.get('/', HealthCheckController.index);

// API
router.use('/blockchain', blockchain);

module.exports = router;