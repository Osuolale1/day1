import { ethers } from "hardhat";

async function main() {
    // Get the signer
    const [signer] = await ethers.getSigners();

    // Get the deployed NFTFactory contract instance
    const NFTFactoryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const NFTFactory = await ethers.getContractAt("NFTFactory", NFTFactoryAddress, signer);

    // Example: Call a method on the NFTFactory contract
    const owner = await NFTFactory.owner();
    console.log("Owner of NFTFactory:", owner);

    // Example: Call a method that requires a transaction
    // const result = await NFTFactory.createNFT("TokenURI");
    // console.log("Transaction hash:", result.hash);
    // await result.wait(); // Wait for the transaction to be mined

    // Add more interaction logic as needed

    // End the script
    console.log("Interaction script completed.");
}

// Run the main function
main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});
