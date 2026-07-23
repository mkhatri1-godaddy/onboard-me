# onboarding

A Claude Code plugin that gets you productive in an unfamiliar repository fast.

Run `/onboard-me` in any repo and it will scan the codebase, existing docs, and
configuration — **read-only** — then write a durable `ONBOARDING.md` and stay
available to answer questions about how the project works.

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

## Usage

```
/onboard-me              # full tour of the current repo
/onboard-me frontend     # weight the tour toward the frontend
/onboard-me backend      # ...or backend, devops, data
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
    └── onboard-me/
        ├── SKILL.md         # the onboarding procedure
        └── references/
            ├── stack-detection.md      # manifest → ecosystem lookup
            └── onboarding-template.md  # ONBOARDING.md output structure
```

## Author

Monish Khatri
