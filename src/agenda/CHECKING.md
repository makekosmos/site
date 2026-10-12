# Checking the Agenda feature list

`features.json` drives the table on `/agenda`. A daily routine checks it against the apps' code and opens a PR when something changed. A person can follow the same steps.

## Sources

- Windows and macOS: `makekosmos/agenda-gpui`. Both columns come from the same code. Mark them differently only when the code has an OS-specific gate such as `cfg(target_os)`.
- Android: `makekosmos/agenda-android`.

Check the latest published release of each repo (`gh api repos/makekosmos/<repo>/releases/latest`), not `main`. The page describes what users can install.

## Statuses

- `yes`: a user can do it in the app.
- `partial`: it works, with a limit. The `note` names the limit in a few words.
- `no`: not in the app.

## Steps

1. Check out the latest release tag of both app repos.
2. For every feature, confirm its status from the code: UI strings (often Russian), screens, commands, settings. Read the matching code before you change a status. Do not judge by file names.
3. Read the release notes since the tags in `sources`. Add a feature only when a user can see or use it. Put it in the matching group with a short sentence-case English name, and its Russian name (and note, if any) under `ru`.
4. Remove a feature only when its code is gone on every platform.
5. Set `checked` to today's date and `sources` to the new tags.

If only `checked` would change, change nothing. Otherwise open a PR from a branch named `agenda-features-YYYY-MM-DD`. Run `bun install` and `bun run check` first. The PR body lists each change with the file and line in the app repo that proves it. Never merge it.
