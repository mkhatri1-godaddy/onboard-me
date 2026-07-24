# Contributing to onboard-me

Thanks for helping improve `onboard-me`. It's a small project — a single Claude
Code skill distributed as a plugin — so contributing is lightweight.

## Project layout

- `skills/onboard-me/SKILL.md` — the skill's instructions (the actual behavior).
- `skills/onboard-me/references/` — lookup tables the skill reads
  (`stack-detection.md`, `onboarding-template.md`).
- `.claude-plugin/` — plugin + marketplace manifests for the `claude plugin` /
  `/plugin` install path.

## Development setup

```bash
git clone https://github.com/mkhatri1-godaddy/onboard-me.git
cd onboard-me
```

There are no dependencies to install.

## Testing your changes

Install the plugin from your local checkout and run `/onboard-me` in a few
repositories of different stacks (a Node app, a Python service, a Go module) to
make sure the tour and `ONBOARDING.md` output hold up:

```bash
claude plugin marketplace add ./          # register this checkout as a marketplace
claude plugin install onboard-me@onboard-me-marketplace
```

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

1. Bump `version` in `.claude-plugin/plugin.json`.
2. Commit and tag: `git tag vX.Y.Z && git push --tags`.

## Pull requests

- One focused change per PR; describe what and why.
- Test the skill as described above and note the result in the PR.
- Be kind in review. Small, clear diffs get merged fastest.
