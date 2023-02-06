// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract MultiSend {

    function multiERC20TransferPacked(bytes[] memory _data) external {
        for (uint i = 0; i < _data.length; i++) {
            (address token, address addy, uint256 amount) = abi.decode(_data[i], (address, address, uint));
            address _token = token;
            address to = addy;
            uint _amount = amount;
            _safeERC20Transfer(address(_token), to, _amount);
        }
    }

    function _safeERC20Transfer(address _token, address _to, uint _amount) internal {
        require(_to != address(0));
        require(ERC20(_token).transferFrom(msg.sender, _to, _amount));
    }
}