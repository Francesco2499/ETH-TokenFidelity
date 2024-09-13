const express = require('express');
const router = express.Router();
const debug = require('debug')('app:routes');

debug('FidelityToken Blockchain routes');

const BlockchainController = require('../controllers/blockchain');


// Endpoint per ottenere il saldo
router.route('/showBalance').post(BlockchainController.getBalance);

// Endpoint per trasferire token
router.route('/transfer').post(BlockchainController.transfer);

// Endpoint per mintare nuovi token (solo per il creatore del contratto)
router.route('/mintTokens').post(BlockchainController.mintTokens);


module.exports = router;
