require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { abiERC20, abiMultiSend } = require("./abi/mockABIs.js");
const { ethers, Contract, BigNumber } = require("ethers");
const ethUtil = require("ethereumjs-util");

const node = process.env.QUICKNODE_HTTP_URL;
const provider = new ethers.providers.JsonRpcProvider(node);

const privatekey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privatekey, provider);

const multiSendAddress = process.env.MULTISEND_CONTRACT_ADDRESS;

app.post("/api/transaction", async (req, res) => {
  const api_key = req.body.api;
  const address = req.body.address;
  const token = req.body.token;
  const amount = req.body.amount;

  //** CHECKS **//
  const isValidAddress1 = ethUtil.isValidAddress(address[0]);
  const isValidAddress2 = ethUtil.isValidAddress(address[1]);

  if (!(isValidAddress1 && isValidAddress1)) {
    return res.status(500).json({
      message: `One of the address is invalid`,
    });
  }

  const amount1 = amount[0];
  const amount2 = amount[1];

  if (!(amount1 > 0 && amount2 > 0)) {
    return res.status(500).json({
      message: `One of the amount inputs is negative and therefore invalid`,
    });
  }

  //** BATCH ERC20 TRANSFER **//
  try {
    const contractSolids = new Contract(token[0], abiERC20, wallet);
    // const contractLink = new Contract(token[1], abiERC20, wallet);

    const decimals = await contractSolids.decimals();

    const contractmultiSend = new Contract(
      multiSendAddress,
      abiMultiSend,
      wallet
    );

    const amounts = [
      ethers.utils.parseEther(amount[0], decimals),
      ethers.utils.parseEther(amount[1], decimals),
    ];

    const tx = await contractmultiSend.multiERC20Transfer(
      token,
      address,
      amounts,
      {
        gasLimit: 1000000,
      }
    );

    // CHECK TRANSACTION FAILS IF USE LINK THAT HAS NOT GIVEN APPROVAL TO MULTISENT
    // LINK ADDRESS: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
    // const tx = await contractLink.allowance(
    //   wallet.address,
    //   contractSolids.address
    // );
    // console.log(tx);

    return res.status(200).json({
      messagge: "Batch transaction successful",
      tx_hash: tx.hash,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e });
  }
});

app.listen(port);
console.log("Server started at http://localhost:" + port);

module.exports = app;
