import { existsSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
const config = JSON.parse(await readFile("vercel.json", "utf8"));
if (config.outputDirectory !== "dist" || config.installCommand !== "bun install" || !config.buildCommand.includes("bun run build")) throw new Error("invalid Vercel build/routing contract");
const html = readFileSync("index.html", "utf8");
if (!html.includes('id="app"')) throw new Error("index.html is missing the app mount");
if (process.argv.includes("--config")) {
  if (existsSync(".tsbuildinfo")) throw new Error("generated .tsbuildinfo must not be tracked");
  console.log("deployment config smoke passed");
} else {
  if (existsSync("dist/index.html")) {
    const source = readFileSync("dist/index.html", "utf8");
    if (source.includes(".map") || /(?:SECRET|PRIVATE_KEY|API_KEY)\s*[:=]/i.test(source)) throw new Error("dist contains source maps or secret material");
  }
  console.log("route and asset smoke passed");
}
