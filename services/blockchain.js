const coin = require('../contract/blockchain');
const debug = require('debug')('app:services:blockchain');
const CryptoJS = require('crypto-js');
const encryptionKey = "secure_encryption_key"; // Deve essere lo stesso del FE

const BlockchainService = {
 
    // Funzione per generare token (mint)
    generateTokens: async (req, res) => {
        const { receiver, amount } = req.body;
 
        try {
            // Chiama la funzione del contratto per mintare nuovi token
            const mint = await coin.mintTokens(receiver, amount);
            debug("Mint success: ", mint);
            return res.json({ success: true, mint: mint.toString() });
        } catch (error) {
            debug("Errore nella generazione dei token: ", error);
            return res.status(500).json({ error: 'Errore nella generazione dei token' });
        }
    },
 
    // Funzione per ottenere il saldo
    getBalance: async (req, res) => {
        const { address } = req.body;
 
        try {
            // Chiama la funzione del contratto per ottenere il saldo
            const balance = await coin.getBalance(address);
            return res.json({ success: true, balance: balance.toString() });
        } catch (err) {
            return res.status(500).json({ error: 'Errore nel recupero del saldo' + err });
        }
    },
 
    // Funzione per trasferire token
    transferTokens: async (req, res) => {
        const { sender, encryptedPrivateKey, receiver, amount } = req.body;
 
        try {
            // Chiama la funzione del contratto per trasferire i token
            // Decripta la chiave privata
            const bytes = CryptoJS.AES.decrypt(encryptedPrivateKey, encryptionKey);
            const privateKey = bytes.toString(CryptoJS.enc.Utf8);

            // Assicurati che la chiave privata sia stata decrittata correttamente
            if (!privateKey) {
                return res.status(400).send('Decryption failed');
            }

            const transaction = await coin.transferTokens(sender, privateKey, receiver, amount);
            debug("Transfer success: ", transaction);
            return res.json({ success: true, transaction: transaction.toString() });
        } catch (error) {
            debug("Errore nel trasferimento dei token: ", error);
            return res.status(500).json({ error: 'Errore nel trasferimento dei token' });
        }
    }
};
 
module.exports = BlockchainService;