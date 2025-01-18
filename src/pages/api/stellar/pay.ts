// pages/api/pay.ts
import { NextApiRequest, NextApiResponse } from "next";
import StellarSdk from "stellar-sdk";

// Set up the Stellar network for Testnet
StellarSdk.Network.useTestNetwork();

// Server keypair - Generate and keep this secret!
const serverKeypair = StellarSdk.Keypair.random();
console.log("Server public key:", serverKeypair.publicKey());

// Handler for payment
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { amount, destinationPublicKey } = req.body;

    if (!amount || !destinationPublicKey) {
      return res.status(400).json({ error: "Amount and destination public key are required." });
    }

    try {
      const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

      // Load the account (the server's account in the test network)
      const account = await server.loadAccount(serverKeypair.publicKey());

      // Build the transaction
      const transaction = new StellarSdk.TransactionBuilder(account, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
        .addOperation(
          StellarSdk.Operation.payment({
            destination: destinationPublicKey,
            asset: StellarSdk.Asset.native(),
            amount: amount.toString(),
          })
        )
        .setTimeout(30)
        .build();

      // Sign the transaction
      transaction.sign(serverKeypair);

      // Submit the transaction
      const transactionResult = await server.submitTransaction(transaction);
      return res.status(200).json({ success: true, transactionResult });
    } catch (error) {
      console.error("Error submitting transaction:", error);
      return res.status(500).json({ error: error });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
