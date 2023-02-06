require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { abiMultiSend, abiERC20 } = require("./abi/mockABIs.js");
const {
  setData,
  checkValidAddress,
  checkArrayLength,
} = require("./helpers/helper.js");

const { ethers, Contract } = require("ethers");

const node = process.env.QUICKNODE_HTTP_URL;
const provider = new ethers.providers.JsonRpcProvider(node);

const privatekey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privatekey, provider);

const multiSendAddress = process.env.MULTISEND_CONTRACT_ADDRESS;
const solids = process.env.SOLIDS_CONTRACT_ADDRESS;

app.post("/api/transaction", async (req, res) => {
  const { api_key, address, token, amount } = req.body;

  checkValidAddress(token, address);

  const checkInputLength = checkArrayLength(token, address, amount);

  if (!checkInputLength) {
    return res.status(400).json({
      message: `Address and Amounts array are not equal`,
    });
  }

  try {
    const contractmultiSend = new Contract(
      multiSendAddress,
      abiMultiSend,
      wallet
    );

    const contractSolids = new Contract(solids, abiERC20, wallet);

    await contractSolids.approve(
      contractmultiSend.address,
      ethers.constants.MaxInt256
    );

    const abi = ethers.utils.defaultAbiCoder;

    const finalData = setData(token, address, amount);

    const tx = await contractmultiSend.multiERC20TransferPacked(finalData, {
      gasLimit: 150000,
    });

    const tx_finalData = await tx.wait();

    return res.status(200).json({
      messagge: "Batch transaction sent",
      tx_data: tx_finalData,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      messagge: "Batch transaction failed",
      message: e,
    });
  }
});

app.listen(port);
console.log("Server started at http://localhost:" + port);

module.exports = app;
