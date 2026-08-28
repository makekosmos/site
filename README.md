# Kosmos marketing site

Vue/Vite marketing site with Vercel deployment configuration.

## Verification

    bun install --frozen-lockfile
    bun run check
    bun run dev

The aggregate check is the CI contract: lint, formatting, TypeScript, static
route/asset/config smoke, and the production build. It validates vercel.json
routing and rejects generated source maps or obvious secret material in dist.

For a Windows manual gate, run the same commands in PowerShell, then run
bun run preview and load the root route at the printed URL. Confirm there are
no console errors, missing assets, or broken internal links in the production
preview before deployment.
