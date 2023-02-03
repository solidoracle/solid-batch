const { ethers } = require("hardhat");

async function main() {
  const MultiSend = await ethers.getContractFactory("MultiSend");
  const multiSend = await MultiSend.deploy();
  await multiSend.deployed();
  console.log("multiSend deployed to: ", multiSend.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
