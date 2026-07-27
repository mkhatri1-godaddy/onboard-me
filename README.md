# onboard-me

A [Claude Code](https://claude.com/claude-code) skill that gets you productive in an
unfamiliar repository fast.

Run `/onboard-me` in any repo and it scans the codebase, existing docs, and
configuration — **read-only** — then writes a durable `ONBOARDING.md` and stays
available to answer questions about how the project works.

## Install

### As a Claude Code plugin (recommended)

Register this repo as a marketplace, then install the plugin from it — no clone,
no Node required:

```bash
claude plugin marketplace add mkhatri1-godaddy/onboard-me
claude plugin install onboard-me@mkhatri1-godaddy
```

Then run `/reload-plugins` in Claude Code (or restart the session) and confirm
with `claude plugin list`.

### Update or reinstall

To pick up a newer version:

```bash
claude plugin marketplace update mkhatri1-godaddy
claude plugin update onboard-me@mkhatri1-godaddy
```

Then run `/reload-plugins` in Claude Code.

To reinstall, remove and install again:

```bash
claude plugin uninstall onboard-me
claude plugin install onboard-me@mkhatri1-godaddy
```

Then run `/reload-plugins` in Claude Code.

> `mkhatri1-godaddy/onboard-me` is the **repo** (the CLI reads
> `.claude-plugin/marketplace.json` from its root); `mkhatri1-godaddy` is
> the **marketplace name** declared in that file. The plugin itself is
> `onboard-me`.

Prefer to do it interactively from inside a session? The same flow is available
as slash commands:

```
/plugin marketplace add mkhatri1-godaddy/onboard-me
/plugin install onboard-me@mkhatri1-godaddy
```

### Manually

Copy `skills/onboard-me/` into `~/.claude/skills/` (personal) or
`.claude/skills/` (project).

## Usage

Open Claude Code in **any** repository and run:

```
/onboard-me
```

It works on any codebase — it detects the stack from what's actually in the repo,
so there's nothing to configure per project.

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
├── hooks/
│   ├── hooks.json           # read-only safety hooks
│   └── scripts/
│       └── enforce-readonly.sh
└── skills/
    └── onboard-me/
        ├── SKILL.md         # the onboarding procedure
        └── references/
            ├── stack-detection.md      # manifest → ecosystem lookup
            └── onboarding-template.md  # ONBOARDING.md output structure
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Acknowledgments

Big thanks to @c-jmutiiria-godaddy for bringing this topic of discussion.

## License

[MIT](LICENSE) © Monish Khatri
