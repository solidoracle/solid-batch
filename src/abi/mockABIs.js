const abiERC20 = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function allowance(address owner, address spender) external view returns (uint256)",

  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function transferFrom(address sender, address recipient, uint256 amount) external returns (bool)",
];

const abiMultiSend = [
  "function multiERC20Transfer(address[] memory _tokens, address[] memory _addresses, uint[] memory _amounts) returns (bool)",
];

module.exports = {
  abiERC20,
  abiMultiSend,
};
