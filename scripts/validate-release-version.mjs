import { readFileSync } from "node:fs";

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const cargoToml = readFileSync("src-tauri/Cargo.toml", "utf8");
const tauriConfig = JSON.parse(readFileSync("src-tauri/tauri.conf.json", "utf8"));
const cargoVersion = cargoToml.match(/^version\s*=\s*"([^"]+)"/m)?.[1];
const releaseTag = process.env.RELEASE_TAG;

if (tauriConfig.version !== "../package.json") {
  throw new Error("tauri.conf.json must derive its version from ../package.json");
}
if (cargoVersion !== packageJson.version) {
  throw new Error(`Cargo version ${cargoVersion} does not match package version ${packageJson.version}`);
}
if (releaseTag && releaseTag !== `v${packageJson.version}`) {
  throw new Error(`Release tag ${releaseTag} must be v${packageJson.version}`);
}

console.log(`Release version validated: ${packageJson.version}`);
