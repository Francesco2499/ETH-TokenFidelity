pragma solidity >= 0.7.1 < 0.9.0;

contract SampleCoin {

    //Define owner
    address public minter;

    //Map balances
    mapping (address => uint) public balances;

    //Define sent event
    event Sent(address from, address to, uint amount);

    constructor() public {
        minter = msg.sender;
    }

    // This function will be used by an address which is able to generate new coins
    // Only the creator of the contract will be able to mine new coins
    function mint(address receiver, uint amount) public returns (uint){
        require(msg.sender == minter); //Only the coin creator can generate funds
        require(amount < 1e60);
        balances[receiver] += amount; //Increase receiver funds
        return balances[receiver];
    }

    // This function is used to swap funds between two addresses
    function send(address receiver, uint amount) public {
         //The sender must have a sufficien amount of funds
        require(amount <= balances[msg.sender], "Insufficient balance detected.");

        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }

    // Function used to show balances
    // "external view" allows those who are not the contract owner to access the function
    function showBalances(address account) external view returns (uint){
        return balances[account];
    }
} 