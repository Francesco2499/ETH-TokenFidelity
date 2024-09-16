const express = require('express');
const router = express.Router();
const debug = require('debug')('app:routes');

debug('FidelityToken Blockchain routes');

const BlockchainController = require('../controllers/blockchain');


// Endpoint per ottenere il saldo
router.route('/showBalance').post(BlockchainController.getBalance);

// Endpoint per trasferire token
router.route('/transferTokens').post(BlockchainController.transferTokens);

// Endpoint per mintare nuovi token (solo per il creatore del contratto)
router.route('/mintTokens').post(BlockchainController.generateTokens);


module.exports = router;
