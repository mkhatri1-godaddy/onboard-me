# Changelog

All notable changes to this project are documented here. Version numbers follow
[Semantic Versioning](https://semver.org/).

## [1.0.3] - 2026-07-27

### Added

- Large-repo delegated mode. A size gate (tracked files > 2,500, or any monorepo
  marker such as `workspaces`/`pnpm-workspace.yaml`/Nx/Turbo/Lerna) switches the
  scan from inline to five parallel read-only `Explore` scouts, each owning a
  template section and returning findings + citations rather than file contents.
  The main agent synthesizes the derived sections (reading list, glossary,
  stale-docs flag) and answers Q&A via scoped searches, keeping context small on
  large monorepos.

## [1.0.2] - 2026-07-27

### Removed

- Read-only enforcement hook (`hooks/`). It was a plugin-level `PreToolUse` hook,
  so it stayed active for **every** session and repo while the plugin was
  enabled — blocking unrelated edits (e.g. in other repos) long after onboarding
  finished. The skill's read-only behavior is now guaranteed by its instructions
  in `SKILL.md` rather than a session-wide hook.

## [1.0.1] - 2026-07-27

### Added

- HTML output option: the skill now asks at write time whether to produce
  `ONBOARDING.md`, a self-contained interactive `ONBOARDING.html`, or both. The
  HTML page bundles inline CSS/JS (sticky table of contents, collapsible
  sections, styled tables, copy buttons) with no external dependencies.
- `references/onboarding-html-template.md` describing the HTML artifact.

### Changed

- Read-only hook now permits writing `ONBOARDING.html` in addition to
  `ONBOARDING.md`; all other write restrictions are unchanged.

## [1.0.0] - 2026-07-26

### Added

- Initial release of the `onboard-me` Claude Code plugin.
- Read-only repository onboarding skill that produces `ONBOARDING.md`.
- Stack detection reference and onboarding output template.
- Read-only safety hooks that block install/build/test commands and restrict
  writes to `ONBOARDING.md`.
- Marketplace metadata (`category`, `tags`, `version`) and plugin `displayName`.

[1.0.3]: https://github.com/mkhatri1-godaddy/onboard-me/releases/tag/v1.0.3
[1.0.2]: https://github.com/mkhatri1-godaddy/onboard-me/releases/tag/v1.0.2
[1.0.1]: https://github.com/mkhatri1-godaddy/onboard-me/releases/tag/v1.0.1
[1.0.0]: https://github.com/mkhatri1-godaddy/onboard-me/releases/tag/v1.0.0
