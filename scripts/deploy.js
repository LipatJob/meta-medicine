// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const contractName = "MetaMedicine";
  const addressLocation =
    "./meta-medicine/src/contracts/meta-medicine-address.json";
  const abiLocation = "./meta-medicine/src/contracts/meta-medicine-abi.json";
  const contract = await deployContract(contractName);
  saveContractAddress(contract, addressLocation);
  saveContractArtifact(contractName, abiLocation);
}

async function deployContract(contractName) {
  const contractFactory = await hre.ethers.getContractFactory(contractName);
  const contract = await contractFactory.deploy();
  await contract.deployed();
  console.log(`Contract deployed to ${contract.address}`);
  return contract;
}

function saveContractAddress(contract, addressLocation) {
  const address = contract.address;
  fs.writeFileSync(
    addressLocation,
    JSON.stringify({ address: address }, null, 2)
  );

  console.log(`Contract address saved to ${addressLocation}`);
}

function saveContractArtifact(contractName, abiLocation) {
  const abi = JSON.stringify(
    hre.artifacts.readArtifactSync(contractName)["abi"]
  );
  fs.writeFileSync(abiLocation, abi);

  console.log(`Contract artifact saved to ${abiLocation}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
