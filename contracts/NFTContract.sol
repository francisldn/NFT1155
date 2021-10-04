// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTContract is ERC1155, Ownable {
    
    uint public constant ARTWORK = 0;
    
    constructor() ERC1155("https://wfcgxtzdogxn.moralishost.com/{id}.json") {
        _mint(msg.sender, ARTWORK, 3, "");
    }
    
    function mint(address account, uint id, uint amount) public onlyOwner {
        _mint(account, id, amount, "");
    }
    
    function burn(address account, uint id, uint amount) public {
        require(msg.sender == account);
        _burn(account, id, amount);
    }
    
    
}