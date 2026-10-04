import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
const mode = process.argv[2] ?? "--lint";
if (mode !== "--lint" && mode !== "--format") throw new Error(`unknown mode: ${mode}`);
const files = execFileSync("git", ["ls-files", "-z"], { encoding: "utf8" }).split("\0").filter(Boolean)
  .filter((file) => !file.startsWith("bun.lock") && !file.endsWith(".tsbuildinfo"));
for (const file of files) {
  let source; try { source = readFileSync(file, "utf8"); } catch { continue; }
  if (source.indexOf("\0") !== -1) continue;
  if (/[ \t]+$/m.test(source)) throw new Error(`trailing whitespace: ${file}`);
  if (!source.endsWith("\n")) throw new Error(`missing final newline: ${file}`);
  if (mode === "--lint" && /(^|\n)\s*debugger\b/.test(source)) throw new Error(`debugger statement: ${file}`);
}
for (const file of ["package.json", "tsconfig.json", "vercel.json"]) JSON.parse(readFileSync(file, "utf8"));
console.log(`${mode.slice(2)} checks passed (${files.length} files)`);
