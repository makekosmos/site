# Checking the Memoria feature list

`features.json` drives the table on `/memoria`. A daily routine checks it against the app's code and opens a PR when something changed. A person can follow the same steps.

## Source

- Windows and macOS: `makekosmos/memoria-gpui`. Both columns come from the same code. Mark them differently only when the code has an OS-specific gate such as `cfg(target_os)`, or a shortcut bound to one modifier only. Linux builds exist but are not listed.
- There is no Android app.

Check the latest published release (`gh api repos/makekosmos/memoria-gpui/releases/latest`), not `main`. The page describes what users can install. Release notes are often only PR lists, so the code is the source of truth.

## Statuses

- `yes`: a user can do it in the app.
- `partial`: it works, with a limit. The `note` names the limit in a few words.
- `no`: not in the app. A setting that is saved but changes nothing, or a button that only shows a "coming soon" toast, is `no`.

Code that no screen reaches (see `docs/unwired-modules.md` in the app repo) is not a feature.

## Steps

1. Check out the latest release tag.
2. For every feature, confirm its status on both OSes from the code: UI strings (often Russian), screens, shortcuts, settings. Read the matching code before you change a status. Do not judge by file names.
3. Read the release notes since the tag in `sources`. Add a feature only when a user can see or use it. Put it in the matching group with a short sentence-case English name, and its Russian name (and note, if any) under `ru`.
4. Remove a feature only when its code is gone on every platform.
5. Set `checked` to today's date and `sources` to the new tag.

If only `checked` would change, change nothing. Otherwise open a PR from a branch named `memoria-features-YYYY-MM-DD`. Run `bun install` and `bun run check` first. The PR body lists each change with the file and line in the app repo that proves it. Never merge it.
