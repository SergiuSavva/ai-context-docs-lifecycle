import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let cachedVersion: string | null = null;

/**
 * Get the CLI package version from package.json.
 */
export function getCliVersion(): string {
  if (cachedVersion) return cachedVersion;

  // From dist/bin.js, package.json is at ../package.json
  // Try multiple paths to handle both dev and built contexts
  const candidates = [
    resolve(__dirname, "../package.json"),
    resolve(__dirname, "../../package.json"),
  ];

  for (const candidate of candidates) {
    try {
      const pkg = JSON.parse(readFileSync(candidate, "utf-8"));
      if (pkg.name === "@acdl/cli" && pkg.version) {
        cachedVersion = pkg.version;
        return pkg.version;
      }
    } catch {
      // Try next candidate
    }
  }

  throw new Error("Could not determine CLI version from package.json");
}
