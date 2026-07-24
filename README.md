# onboard-me

A [Claude Code](https://claude.com/claude-code) skill that gets you productive in an
unfamiliar repository fast.

Run `/onboard-me` in any repo and it scans the codebase, existing docs, and
configuration — **read-only** — then writes a durable `ONBOARDING.md` and stays
available to answer questions about how the project works.

## Install

### With npx (recommended)

No clone, no global install — one command copies the skill into your Claude Code
skills directory:

```bash
npx onboard-me            # install for your user  (~/.claude/skills/onboard-me)
npx onboard-me --project  # install into the current repo (./.claude/skills/onboard-me)
npx onboard-me --force    # overwrite an existing install (use to update)
```

Then start Claude Code in any repository and run `/onboard-me`.

> Requires Node ≥ 16.7. Installing per-user makes the skill available in every
> project; `--project` commits it to one repo so your whole team gets it.

### As a Claude Code plugin

Prefer the plugin/marketplace flow? Add the marketplace and install:

```
/plugin marketplace add mkhatri1-godaddy/onboard-me
/plugin install onboard-me@onboard-me-marketplace
```

### Manually

Copy `skills/onboard-me/` into `~/.claude/skills/` (personal) or
`.claude/skills/` (project).

## Usage

```
/onboard-me              # full tour of the current repo
/onboard-me frontend     # weight the tour toward the frontend
/onboard-me backend      # ...or backend, devops, data
```

## What it does

- **Detects the stack** — language-agnostic; works on any repo by reading its
  manifests and config.
- **Maps the directory structure** — which folder is for what, and where the
  entry points live.
- **Extracts setup** — prerequisites, install / build / run / test commands, and
  required env vars, pulled straight from the repo (never executed).
- **Documents the PR process & deployment** — when the repo defines them.
- **Gathers documentation & useful links** — README, ADRs, and external
  references surfaced in the docs.
- **Builds a reading list & glossary** — an ordered path into the code and the
  project's vocabulary.
- **Flags stale docs** — mismatches between documentation and the actual code.

It's read-only: the only file it writes is `ONBOARDING.md`, and only after you
confirm.

## Structure

```
onboard-me/
├── .claude-plugin/
│   ├── plugin.json          # plugin manifest
│   └── marketplace.json     # single-plugin marketplace catalog
├── bin/
│   └── install.js           # npx installer (copies the skill into ~/.claude/skills)
├── skills/
│   └── onboard-me/
│       ├── SKILL.md         # the onboarding procedure
│       └── references/
│           ├── stack-detection.md      # manifest → ecosystem lookup
│           └── onboarding-template.md  # ONBOARDING.md output structure
└── package.json
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE) © Monish Khatri
