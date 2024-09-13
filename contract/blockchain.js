'use strict';

const solc = require("solc");
const fs = require("fs");
const Web3 = require("Web3");
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
    init(){
        this.web3 = new Web3(new Web3.providers.HttpProvider(env.PROVIDER));

        var file = fs.readFileSync(path.resolve(__dirname, "FidelityCoin.sol")).toString();
        console.log(file);

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

        this.web3.eth.getAccounts().then((accounts) => {
            debug("Accounts: " + accounts);
            this.mainAccount = accounts[0]; // Assuming the first account is the contract deployer
        });

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
        return await contract.methods.mint(receiver, amount).send({ from: this.mainAccount, gas: 470000 }, (err, data) => {
            debug("-------------- MINT --------------");
            debug(data);
            debug("-------------------------------------");
            return data;
        });
    }

    // Function used to transfer tokens
    async transferTokens(receiver, amount) {
        if (!isValidAddress(receiver)) {
            debug("Invalid address");
            return false;
        }

        if (!isValidAmount(amount)) {
            debug("Invalid amount");
            return false;
        }

        var contract = new this.web3.eth.Contract(this.ABI, this.contractAddress);
        return await contract.methods.send(receiver, amount).send({ from: this.mainAccount, gas: 470000 }, (err, data) => {
            debug("-------------- SEND --------------");
            debug(data);
            debug("-------------------------------------");
            return data;
        });
    }
}

// Init coin class element and export
var coin = new Coin();
coin.init();
module.exports = coin;
