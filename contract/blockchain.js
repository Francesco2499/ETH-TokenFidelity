'use strict';

const solc = require("solc");
const fs = require("fs");
const {Web3} = require('web3')
const env = require('../config/env.js');
var path = require("path");
const debug = require('debug')('app:config:smartContract');

// Helper functions
function isValidAddress(address) {
    return /^(0x)?[0-9a-f]{40}$/i.test(address);
}

function isValidAmount(amount) {
    return amount > 0 && typeof Number(amount) == 'number';
}

// Define coin class
class Coin {
    constructor() {
        this.web3 = null;
        this.ABI = null;
        this.bytecode = null;
        this.mainAccount = null;
        this.contractAddress = null; // Contract address already deployed
    }

    // Function used to init web3
    async init(){
        this.web3 = new Web3(new Web3.providers.HttpProvider(env.PROVIDER));

        var file = fs.readFileSync(path.resolve(__dirname, "FidelityCoin.sol")).toString();

        var input = {
            language: "Solidity",
            sources: {
                "FidelityCoin.sol": {
                    content: file,
                },
            },
            settings: {
                outputSelection: {
                    "*": {
                        "*": ["*"],
                    },
                },
            },
        };

        var output = JSON.parse(solc.compile(JSON.stringify(input)));
        debug("Result : " + output);

        this.ABI = output.contracts["FidelityCoin.sol"]["FidelityCoin"].abi;
        this.bytecode = output.contracts["FidelityCoin.sol"]["FidelityCoin"].evm.bytecode.object;
        debug("Bytecode: " + this.bytecode);
        debug("ABI: " + this.ABI);
        const accounts = await this.web3.eth.getAccounts();
        if (accounts[0]) {
            this.mainAccount = accounts[0];
        }
        /*console.log('Istanza', this.web3);
        this.web3.eth.net.isListening()
            .then(() => console.log('Connected to provider'))
            .catch(e => console.log('Something went wrong', e));

        this.web3.eth.getAccounts().then((accounts) => {
            debug("Accounts: " + accounts);
            this.mainAccount = accounts[0]; // Assuming the first account is the contract deployer
        })
        .catch(err => {
            console.log(err);
        });;*/

        // Set the contract address (already deployed)
        this.contractAddress = env.CONTRACT_ADDRESS; // Add this to your env file
    }

    // Function used to get balances
    async getBalance(address) {

        if (!isValidAddress(address)) {
            debug("Invalid address");
            return false;
        }

        var contract = new this.web3.eth.Contract(this.ABI, this.contractAddress);
        return await contract.methods.showBalances(address).call((err, data) => {
            debug("-------------- BALANCE --------------");
            debug(data);
            debug("-------------------------------------");
            return data;
        });
    }

    // Function used to mint new tokens (only contract creator can do this)
    async mintTokens(receiver, amount) {
        if (!isValidAddress(receiver)) {
            debug("Invalid address");
            return false;
        }

        if (!isValidAmount(amount)) {
            debug("Invalid amount");
            return false;
        }

        var contract = new this.web3.eth.Contract(this.ABI, this.contractAddress);
        return await contract.methods.mint(receiver, amount).send({ from: this.mainAccount, gas: 6721975, gasPrice: 20000000000 }, (err, data) => {
            debug("-------------- MINT --------------");
            debug(data);
            debug("-------------------------------------");
            return data;
        });
    }

    // Function used to transfer tokens
    async transferTokens(recipient, amount) {
        const data = contract.methods.transferTokens(recipient, amount).encodeABI();
    
        const tx = {
            from: '0xDD335FD9196b4fb0E4E62606afc17c1b909AC7F9',
            to: contractAddress,
            gas: 6721975, gasPrice: 20000000000,
            data: data
        };
    
        const signedTx = await web3.eth.accounts.signTransaction(tx, '0x08bb6f89c2059b2f917a340afacb875af37edb6aa6e2f0cffb12e71a2cd2e7cf');
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    
        console.log('Transaction receipt: ', receipt);
    }
}

// Init coin class element and export
var coin = new Coin();
coin.init();
module.exports = coin;
