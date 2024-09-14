const debug = require('debug')('app:config:env');
const dotenv = require('dotenv');

// Carica le variabili d'ambiente dal file .env
dotenv.config();

debug('Loading environment');

const env = name => process.env[name.toUpperCase()];

module.exports = {
    NODE_ENV: env('node_env') || 'development',
    PORT: env('port') || 3000,
    PROVIDER: env('provider') || 'HTTP://127.0.0.1:8545', // Default to a local Ganache instance
    CONTRACT_ADDRESS: env('contract_address') // Aggiungi questa riga se hai un indirizzo del contratto nel tuo .env
};
