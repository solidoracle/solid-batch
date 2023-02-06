const { ethers } = require("ethers");
const ethUtil = require("ethereumjs-util");

function setData(tokens, addresses, amounts) {
  const dataArray = [];
  const abi = ethers.utils.defaultAbiCoder;

  for (let i = 0; i < tokens.length; i++) {
    for (let j = 0; j < addresses[i].length; j++) {
      let parsedAmount = ethers.utils.parseEther(amounts[i][j]);

      let data = abi.encode(
        ["address", "address", "uint"],
        [tokens[i], addresses[i][j], parsedAmount]
      );

      dataArray.push(data);
    }
  }

  return dataArray;
}

function checkValidAddress(tokens, addresses) {
  for (let i = 0; i < tokens.length; i++) {
    for (let j = 0; j < addresses[i].length; j++) {
      ethUtil.isValidAddress(addresses[i][j]);
    }
  }
}

function checkArrayLength(tokens, addresses, amounts) {
  for (let i = 0; i < tokens.length; i++) {
    if (addresses[i].length != amounts[i].length) {
      return false;
    }
  }
  return true;
}

module.exports = {
  setData,
  checkValidAddress,
  checkArrayLength,
};
