// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract MultiSend {


    /// @notice Send multiple ERC20 tokens to multiple addresses and amounts
    /// @param _tokens The tokens to send
    /// @param _addresses Array of addresses to send to
    /// @param _amounts Array of token amounts to send
    function multiERC20Transfer(
        address[] memory _tokens,
        address[] memory _addresses,
        uint[] memory _amounts
    ) public {
        // require(tokenHolders.length == amounts.length, "Invalid input parameters");

        for (uint i = 0; i < _tokens.length; i++) {
            for (uint j = 0; j < _addresses.length; j++) {
                _safeERC20Transfer(_tokens[i], _addresses[j], _amounts[j]);
            }
        }
    }

    /// @notice `_safeERC20Transfer` is used internally to
    ///  transfer a quantity of ERC20 tokens safely.
    function _safeERC20Transfer(address _token, address _to, uint _amount) internal {
        require(_to != address(0));
        require(ERC20(_token).transferFrom(msg.sender, _to, _amount));

    }

}