/* eslint-disable */

const { Conflux } = require('js-conflux-sdk');
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

async function main() {
  const cfx = new Conflux({
    url: 'http://testnet-jsonrpc.conflux-chain.org:12537',
    defaultGasPrice: 100,
    defaultGas: 1000000,
    logger: console,
  });

  console.log(cfx.defaultGasPrice); // 100
  console.log(cfx.defaultGas); // 1000000

  // ================================ Account =================================
  const account = cfx.Account(PRIVATE_KEY); // create account instance
  console.log(account.address); // 0x1bd9e9be525ab967e633bcdaeac8bd5723ed4d6b

  // ================================ Contract ================================
  // create contract instance
  const contract = cfx.Contract({
    abi: require('./contract/abi.json'), //can be copied from remix
    address: "0x8d83e6a0b245f023ff02147dc19a65c4e1e091a1"
  });

  //get current number
  const result = await contract.result();
  console.log(Number(result));

  // const logs = await cfx.getLogs({address: contract.address})
  // console.log(logs);


  // // estimate deploy contract gas use
  // const estimate = await contract.constructor().estimateGasAndCollateral();
  // console.log(JSON.stringify(estimate)); // {"gasUsed":"175050","storageCollateralized":"64"}
  //
  // // deploy the contract, and get `contractCreated`
  // const receipt = await contract.constructor()
  //   .sendTransaction({ from: account })
  //   .confirmed();
  // console.log(receipt); // receipt.contractCreated: 0x8d83e6a0b245f023ff02147dc19a65c4e1e091a1
}

main().catch(e => console.error(e));
