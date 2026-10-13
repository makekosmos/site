# Checking the Mundus feature list

`features.json` drives the table on the home page. A daily routine checks it against the Cortex code and opens a PR when something changed. A person can follow the same steps.

## Sources

- Windows and macOS: `makekosmos/cortex` (Engine, Manager, installer). Windows is the main platform.
- Apps such as Agenda, Memoria and Dictation have their own repos and their own lists (Agenda: `src/agenda/features.json`). Do not list them here, only what the store, Manager or Engine offers.
- Phone sync is not part of Cortex. Do not add an Android column.

Check the latest published release (`gh api repos/makekosmos/cortex/releases/latest`), not `main`. The page describes what users can install. Nightly builds are not releases for this purpose.

## Statuses

- `yes`: a user can do it in Manager or an installed app.
- `partial`: it works, with a limit. The `note` names the limit in a few words. Use it for OS gates (`cfg(target_os)`, a Windows-only privileged service, a stub on macOS) and for settings that only partly work.
- `no`: not available on that OS.

A feature behind a Cargo feature that release builds do not enable (for example `engine/local-dictation`) is not listed.

## Steps

1. Check out the latest release tag.
2. For every feature, confirm its status on both OSes from the code: Manager screens and strings (often Russian), Engine ops, settings. Read the matching code before you change a status. Do not judge by file names.
3. Read the release notes since the tag in `sources`. Add a feature only when a user can see or use it. Put it in the matching group with a short sentence-case English name, and its Russian name (and note, if any) under `ru`.
4. Remove a feature only when its code is gone on every platform.
5. Set `checked` to today's date and `sources` to the new tag.

If only `checked` would change, change nothing. Otherwise open a PR from a branch named `features-YYYY-MM-DD`. Run `bun install` and `bun run check` first. The PR body lists each change with the file and line in the Cortex repo that proves it. Never merge it.
