import { warp, configureWallet } from "./configureWarpServer.js";
import { transactionId } from "../transactionId.js";

async function read() {
  let wallet = await configureWallet();
  const contract = warp.contract(transactionId).connect(wallet);
  const { cachedValue } = await contract.readState();
  console.log("Contract State: ", JSON.stringify(cachedValue));
}

read();
