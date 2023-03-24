import fs from "fs";
import { configureWallet, warp } from "./configureWarpServer.js";
import { ArweaveSigner } from "warp-contracts-plugin-deploy";

async function deploy() {
  const wallet = await configureWallet();
  const state = fs.readFileSync("state.json", "utf-8");
  const contractSource = fs.readFileSync("contract.js", "utf-8");

  const { contractTxId } = await warp.createContract.deploy({
    wallet: new ArweaveSigner(wallet),
    initState: state,
    src: contractSource,
  });

  fs.writeFileSync(
    "../transactionId.js",
    `export const transactionId = "${contractTxId}"`
  );
  const contract = warp.contract(contractTxId).connect(wallet);
  await contract.writeInteraction({
    function: "initialize",
  });

  const { cachedValue } = await contract.readState();

  console.log("Contract State: ", cachedValue);
  console.log("ContractTxId: ", contractTxId);
}
deploy();
