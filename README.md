# onboarding

A Claude Code plugin that gets you productive in an unfamiliar repository fast.

Run `/onboarding` in any repo and it will scan the codebase, existing docs,
configuration, and git history — **read-only** — then write a durable
`ONBOARDING.md` and stay available to answer questions about how the project
works.

## What it does

- **Detects the stack** — language-agnostic; works on any repo by reading its
  manifests and config.
- **Extracts a quickstart** — install / build / run / test commands and required
  env vars, pulled straight from the repo (never executed).
- **Maps the architecture** — components, key abstractions, integrations, plus a
  Mermaid diagram.
- **Surfaces where the action is** — uses git history to show actively developed
  areas.
- **Builds a reading list & glossary** — an ordered path into the code and the
  project's vocabulary.
- **Flags stale docs** — mismatches between documentation and the actual code.

It's read-only: the only file it writes is `ONBOARDING.md`, and only after you
confirm.

## Usage

```
/onboarding              # full tour of the current repo
/onboarding frontend     # weight the tour toward the frontend
/onboarding backend      # ...or backend, devops, data
```

## Install

Add the marketplace, then install the plugin:

```
/plugin marketplace add MonishKhatri/onboarding
/plugin install onboarding@onboarding-marketplace
```

(Replace `MonishKhatri/onboarding` with the actual GitHub repo path once
published.)

## Structure

```
onboarding/
├── .claude-plugin/
│   ├── plugin.json          # plugin manifest
│   └── marketplace.json     # single-plugin marketplace catalog
└── skills/
    └── onboarding/
        ├── SKILL.md         # the onboarding procedure
        └── references/
            ├── stack-detection.md      # manifest → ecosystem lookup
            └── onboarding-template.md  # ONBOARDING.md output structure
```

## Author

Monish Khatri
