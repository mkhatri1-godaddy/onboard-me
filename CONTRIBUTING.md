# Contributing to onboard-me

Thanks for helping improve `onboard-me`. It's a small project — a single Claude
Code skill plus a zero-dependency npx installer — so contributing is
lightweight.

## Project layout

- `skills/onboard-me/SKILL.md` — the skill's instructions (the actual behavior).
- `skills/onboard-me/references/` — lookup tables the skill reads
  (`stack-detection.md`, `onboarding-template.md`).
- `bin/install.js` — the `npx onboard-me` installer. Node built-ins only; **keep
  it dependency-free** so `npx` stays instant and safe.
- `.claude-plugin/` — plugin + marketplace manifests for the `/plugin` install path.
- `package.json` — npm metadata; `bin` maps `onboard-me` → `bin/install.js`.

## Development setup

```bash
git clone https://github.com/mkhatri1-godaddy/onboard-me.git
cd onboard-me
```

There are no dependencies to install.

## Testing your changes

**Test the installer** by running it against a throwaway HOME so you don't touch
your real skills directory:

```bash
TMP=$(mktemp -d)
HOME="$TMP" node bin/install.js          # user-scope install
find "$TMP/.claude/skills" -type f       # confirm files landed
HOME="$TMP" node bin/install.js          # should refuse (already installed)
HOME="$TMP" node bin/install.js --force  # should overwrite
rm -rf "$TMP"
node bin/install.js --project            # installs ./.claude/skills — delete after
```

**Test the packaged contents** before publishing:

```bash
npm pack --dry-run   # verify skills/, bin/, README.md, LICENSE are included
```

**Test the skill itself** by installing it locally and running `/onboard-me` in a
few repositories of different stacks (a Node app, a Python service, a Go module)
to make sure the tour and `ONBOARDING.md` output hold up.

## Editing the skill

- Keep it **read-only**: the skill must never run build/install/test commands or
  modify source. The only file it writes is `ONBOARDING.md`, and only after the
  user confirms.
- Every command or claim the skill emits must come from a file it actually read —
  no invented quickstart commands. If a doc and the code disagree, trust the code
  and flag it.
- Keep guidance language-agnostic; extend `references/stack-detection.md` rather
  than hard-coding one ecosystem.

## Releasing

Maintainers cut releases:

1. Bump `version` in `package.json` (and `.claude-plugin/plugin.json` to match).
2. Commit and tag: `git tag vX.Y.Z && git push --tags`.
3. `npm publish` (publishes to the public registry via `publishConfig`).

## Pull requests

- One focused change per PR; describe what and why.
- Run the installer tests above and note the result in the PR.
- Be kind in review. Small, clear diffs get merged fastest.
