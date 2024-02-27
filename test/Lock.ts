import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {

  

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount, _factoryAddress] = await ethers.getSigners();

    const   NFTFactory = await ethers.getContractFactory('NFTFactory');

    const   MyNFT = await ethers.getContractFactory('MyNFT');
   
    const nFTFactory = await NFTFactory.deploy();

    await nFTFactory.deployed();

    const myNFT = await NFTFactory.deploy(nFTFactory.address);

    await myNFT.deployed();

    return { _factoryAddress, owner, otherAccount };
  }

  describe("Deployment", async function () {
    const _factoryAddress = await ethers.getContractFactory('_factoryAddress');
    const socialMedia = await _factoryAddress.deploy();
       await socialMedia.deployed();
   });

   // Test case for creating NFT through SocialMedia contract
   it('Should create a new NFT through SocialMedia contract', async function () {
       const tokenURI = 'https://example.com/nft';

       await expect(socialMedia.createNFT(tokenURI)).to.emit(socialMedia, 'NFTCreated');
   });
});

