const debug = require('debug')('app:controllers:blockchain');
const BlockchainService = require('../services/blockchain');
 
const BlockchainController = {
    // Funzione per generare token (mint)
    generateTokens: async (req, res, next) => {
        debug('Executing generate tokens');
        return await BlockchainService.generateTokens(req, res);
    },
 
    // Funzione per ottenere il saldo
    getBalance: async (req, res, next) => {
        debug('Executing get balance');
        return await BlockchainService.getBalance(req, res);
    },
 
    // Funzione per trasferire token
    transferTokens: async (req, res, next) => {
        debug('Executing transfer tokens');
        return await BlockchainService.transferTokens(req, res);
    }
};
 
module.exports = BlockchainController;