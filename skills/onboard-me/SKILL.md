---
name: onboard-me
description: Onboard a developer to the current repository. Scans the codebase, existing docs, and config (read-only) to produce a durable ONBOARDING.md — stack, directory structure, setup, PR process, deployment, and useful links — and then answers questions about how the project works. Use when someone is new to a repo, asks to "onboard me", "explain this codebase", "how do I get started here", or "give me a tour of the repo".
---

# Repository Onboarding

Your job is to get a developer productive in an unfamiliar repository as fast as
possible. You do this by investigating the repo in a fixed order, synthesizing
what you find into a durable `ONBOARDING.md`, and then staying available for
grounded follow-up questions.

## Operating rules

- **Read-only.** Never run build, install, test, or setup commands. Never
  modify source. You may read files and inspect git history. The one file you
  create is `ONBOARDING.md` (only after confirming with the user — see step 7).
- **Cite what's real.** Every command, path, and claim in your output must come
  from a file you actually read or git output you actually ran. If a doc and the
  code disagree, trust the code and flag the discrepancy. Never invent a
  quickstart command that isn't in the repo.
- **Language-agnostic.** Detect the stack from what's present; don't assume.
  Use `references/stack-detection.md` as the lookup table.
- **Be concise in chat.** The detailed synthesis goes in the artifact, not the
  conversation. In chat, report progress and headline findings.

## Procedure

Work through these steps in order. Announce the phase you're in, then act.

### 1. Inventory

Build a picture of what exists before reading deeply.

- List the top two levels of the directory tree; note the important dirs
  (source, tests, infra, docs, scripts).
- Glob for manifests and lockfiles (`package.json`, `pyproject.toml`, `go.mod`,
  `Cargo.toml`, `pom.xml`, `Gemfile`, `composer.json`, etc.).
- Glob for docs: `README*`, `CONTRIBUTING*`, `ARCHITECTURE*`, `docs/**`,
  `CLAUDE.md`, `AGENTS.md`, ADRs (`docs/adr/**`, `doc/decisions/**`).
- Glob for config: `.env.example`, `docker-compose*`, `Dockerfile`, CI configs
  (`.github/workflows/**`, `.gitlab-ci.yml`, `.circleci/**`), lint/format
  configs, `Makefile`/`Justfile`/`Taskfile`.
- Glob for process/deploy signals: `CONTRIBUTING*`, PR templates
  (`.github/pull_request_template.md`, `.github/PULL_REQUEST_TEMPLATE/**`),
  deploy configs (`vercel.json`, `netlify.toml`, `fly.toml`, `render.yaml`,
  `k8s/**`, Helm `Chart.yaml`).

### 2. Detect the stack

Using `references/stack-detection.md`, map the manifests found to languages,
package managers, frameworks, and runtimes. A repo may be polyglot — record all
of them. Note the primary language (most source files / the one the entry point
is in).

### 3. Map the directory structure

Explain what lives where — this is the section newcomers reach for most.

- Walk the significant top-level (and notable nested) directories.
- For each, state its purpose in one line: what kind of code/assets it holds and
  what part of the system it serves (e.g. `src/api/` — HTTP route handlers,
  `migrations/` — database schema changes).
- Note where the main entry point(s) live.
- Skip noise (`node_modules`, `.git`, build output, vendored deps).

### 4. Extract the setup

This is what a new dev needs first. Pull — do not run — the exact steps for:

- Prerequisites (runtime versions, tools to install first)
- Install / bootstrap dependencies
- Configure environment (env vars from `.env.example`; what each is for)
- Build (if applicable)
- Run (dev server, CLI, main entry point)
- Test
- Local services required (from docker-compose / docs)

Source commands from README, `CONTRIBUTING`, `Makefile`/task runner, and the
`scripts` section of the manifest. Prefer the manifest/task-runner over prose
when they conflict, and note the conflict.

### 5. Conventions, PR process & deployment

- **Conventions** — testing framework and where tests live, lint/format tooling,
  commit style, and any code-style notes from `CONTRIBUTING`/`CLAUDE.md`.
- **PR process** (only if documented) — from `CONTRIBUTING`, PR templates, and
  CI: branch naming, where to branch from, required checks, review/approval
  rules, and any PR template that must be filled in. If nothing is documented,
  record that plainly rather than inventing a process.
- **Deployment** (only if present) — from CI/CD configs, `Dockerfile`, and
  platform configs (Vercel/Fly/Render/k8s/Helm): how/where it deploys, what
  triggers a deploy, and which environments exist. If absent, record that.

### 6. Documentation & useful links

Collect pointers a newcomer will want: README/docs site, `CONTRIBUTING`,
`ARCHITECTURE`, ADRs, and any external links surfaced in the docs (wiki, API
reference, dashboards, issue tracker, chat channels, project homepage).

### 7. Assemble reading list & glossary

- **Start here** — an ordered list of 5–10 files a newcomer should read, each
  with one line on why.
- **Glossary** — domain-specific terms found in code/docs, with plain-language
  definitions, so the newcomer learns the project's vocabulary.

### 8. Write the artifact

Ask the user to confirm before writing (it's the only file you create). Then
write `ONBOARDING.md` at the repo root using the structure in
`references/onboarding-template.md`. Fill every section from your findings; omit
a section only if genuinely not applicable, and say so.

### 9. Offer Q&A

After writing, tell the user the doc is ready and invite grounded questions
("ask me anything about this repo"). Answer from files you read; read more as
needed. Keep answers anchored to real paths.

## Tailoring (optional)

If the user passes a focus argument, weight the tour accordingly:

- `frontend` — UI components, state management, routing, build/bundler, styling.
- `backend` — services, data models, APIs, persistence, background jobs.
- `devops` / `infra` — CI/CD, containers, deployment, environments, secrets.
- `data` — pipelines, schemas, storage, transformations.

Still produce the full artifact, but lead the chat summary and reading list with
the chosen area.

## Freshness checks

While scanning, flag mismatches between docs and code — stale README commands,
env vars referenced in code but missing from `.env.example`, scripts documented
but absent from the manifest. Collect these in a "⚠️ Docs that may be stale"
section so maintainers can fix them.
