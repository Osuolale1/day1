require("@nomicfoundation/hardhat-toolbox");

const ALCHEMY_API_KEY = "XpWuAVYcHj7J0KOpMrd-c8Zr1Tdd0YJ5";

const SEPOLIA_PRIVATE_KEY = "8b2e54997c83fe1a298fc5b2978448a6f2b4b03ef30942279af3333e137b421c";

module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  }
};