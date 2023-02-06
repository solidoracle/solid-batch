// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract ERC20mock2 is ERC20 {
    constructor(string memory name, string memory symbol, uint initialSupply) public ERC20(name, symbol) {
          _mint(msg.sender, initialSupply);
    }
  }
  