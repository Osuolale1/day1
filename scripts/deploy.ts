import { ethers } from "hardhat";
//import { getAddress } from "ethers/lib/utils";


async function main() {
  const [owner] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', owner.address);

  const NFTFactory = await ethers.getContractFactory('NFTFactory');
  const nFTFactory = await NFTFactory.deploy();

  await nFTFactory.waitForDeployment();


  console.log(
    `NFTFactory deployed to ${nFTFactory.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

   