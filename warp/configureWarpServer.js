import { WarpFactory } from "warp-contracts";
import fs from "fs";
import { DeployPlugin } from "warp-contracts-plugin-deploy";

const environment = process.env.WARPDEV || "testnet";
let warp;

if (environment === "testnet") {
  warp = WarpFactory.forTestnet().use(new DeployPlugin());
} else if (environment === "mainnet") {
  warp = WarpFactory.forMainnet().use(new DeployPlugin());
} else {
  throw new Error("Invalid environment");
}

async function configureWallet() {
  try {
    if (environment === "testnet") {
      try {
        return JSON.parse(fs.readFileSync("../testwallet.json", "utf-8"));
      } catch (err) {
        const { jwk } = await warp.generateWallet();
        fs.writeFileSync("../testwallet.json", JSON.stringify(jwk));
        return jwk;
      }
    } else {
      return JSON.parse(fs.readFileSync("../wallet.json", "utf-8"));
    }
  } catch (err) {
    console.log("Error configuring wallet", err);
  }
}

export { configureWallet, warp };
