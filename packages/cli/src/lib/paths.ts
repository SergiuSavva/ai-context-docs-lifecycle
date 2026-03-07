import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Resolve paths relative to the CLI package root.
 * Works whether running from source (src/) or compiled (dist/).
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** Root of the @acdl/cli npm package (where package.json lives) */
export function getPackageRoot(): string {
  // From dist/bin.js -> package root is ..
  // From src/lib/paths.ts -> package root is ../..
  // tsup bundles everything into dist/bin.js, so at runtime __dirname is dist/
  return resolve(__dirname, "..");
}

/** Path to the bundled methodology content/ directory inside the npm package */
export function getBundledContentDir(): string {
  return resolve(getPackageRoot(), "content");
}

