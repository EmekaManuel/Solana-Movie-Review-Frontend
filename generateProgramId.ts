const web3 = require("@solana/web3.js");
const fs = require("fs");

// Generate a new keypair
const keypair = web3.Keypair.generate();

// Get the public key (program ID)
const programId = keypair.publicKey.toBase58();

// Get the secret key
const secretKey = Array.from(keypair.secretKey);

// Prepare the data to save to JSON
const keypairData = {
  programId: programId,
  secretKey: secretKey,
};

// Save the keypair data to a JSON file
fs.writeFileSync("program-keypair.json", JSON.stringify(keypairData, null, 2));

// Log the saved information
console.log("New Program ID:", programId);
console.log("Secret Key:", secretKey);
