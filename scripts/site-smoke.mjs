import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
const config = JSON.parse(await readFile("vercel.json", "utf8"));
if (config.outputDirectory !== "dist" || config.installCommand !== "bun install" || typeof config.buildCommand !== "string" || !config.buildCommand.includes("bun run build")) throw new Error("invalid Vercel build/routing contract");
const html = readFileSync("index.html", "utf8");
if (!html.includes('id="app"')) throw new Error("index.html is missing the app mount");
if (process.argv.includes("--config")) {
  const trackedBuildInfo = execFileSync("git", ["ls-files", "-z", "--", "*.tsbuildinfo"], { encoding: "utf8" })
    .split("\0").filter(Boolean);
  if (trackedBuildInfo.length > 0) throw new Error(`generated tsbuildinfo must not be tracked: ${trackedBuildInfo.join(", ")}`);
  console.log("deployment config smoke passed");
} else {
  if (!existsSync("dist/index.html")) throw new Error("dist/index.html is missing — run `bun run build` before site smoke");
  const secretPattern = /(?:SECRET|PRIVATE_KEY|API_KEY)\s*[:=]/i;
  const pending = ["dist"];
  while (pending.length > 0) {
    const dir = pending.pop();
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const filePath = join(dir, entry.name);
      if (entry.isDirectory()) {
        pending.push(filePath);
        continue;
      }
      if (entry.name.toLowerCase().endsWith(".map")) throw new Error(`generated source map in dist: ${filePath}`);
      if (!/\.(?:html?|js|mjs|css|json|svg|txt|xml|webmanifest)$/i.test(entry.name)) continue;
      const source = readFileSync(filePath, "utf8");
      if (source.includes("sourceMappingURL=") || secretPattern.test(source)) throw new Error(`dist contains source maps or secret material: ${filePath}`);
    }
  }
  console.log("route and asset smoke passed");
}
