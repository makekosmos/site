import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const exists = (file) => access(path.join(root, file)).then(() => true).catch(() => false);

test("Site uses pnpm across active package and deployment contracts", async () => {
  const manifest = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
  const active = await Promise.all(["package.json", "README.md", "lefthook.yml", "vercel.json", "scripts/site-smoke.mjs", ".github/workflows/ci.yml"]
    .map((file) => readFile(path.join(root, file), "utf8")));
  assert.equal(manifest.packageManager, "pnpm@12.4.1");
  assert.equal(await exists("bun.lock"), false);
  assert.equal(await exists("pnpm-lock.yaml"), true);
  assert.ok(active.every((source) => !/\bbun(?:x)?\b/.test(source)));
});
