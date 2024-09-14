<<<<<<< Updated upstream
pragma solidity >= 0.7.1 < 0.9.0;
=======
// SPDX-License-Identifier: MIT

pragma solidity >=0.7.1 <0.9.0;
>>>>>>> Stashed changes

contract SampleCoin {

    // Define the owner (minter)
    address public minter;

    // Mapping of balances
    mapping (address => uint) public balances;

    // Define the Transfer event (standard ERC-20)
    event Transfer(address indexed from, address indexed to, uint256 value);

<<<<<<< Updated upstream
    constructor() public {
=======
    // Constructor sets the minter (creator of the contract)
    constructor() {
>>>>>>> Stashed changes
        minter = msg.sender;
    }

    // Mint function allows the minter to create new tokens
    function mint(address receiver, uint amount) public returns (uint) {
        require(msg.sender == minter, "Only the minter can mint tokens");
        require(amount < 1e60, "Amount exceeds maximum limit");
        
        balances[receiver] += amount; // Increase receiver's balance
        emit Transfer(address(0), receiver, amount); // Emit Transfer event from address(0) to indicate minting
        return balances[receiver];
    }

    // Transfer function to move tokens between addresses
    function transfer(address receiver, uint amount) public returns (bool) {
        require(amount <= balances[msg.sender], "Insufficient balance");
        
        balances[msg.sender] -= amount; // Deduct sender's balance
        balances[receiver] += amount; // Add to receiver's balance
        emit Transfer(msg.sender, receiver, amount); // Emit Transfer event
        return true; // Return true to indicate success
    }

    // Function to view the balance of an account
    function showBalances(address account) external view returns (uint) {
        return balances[account];
    }
}
