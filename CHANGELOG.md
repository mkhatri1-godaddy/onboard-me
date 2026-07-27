# Changelog

All notable changes to this project are documented here. Version numbers follow
[Semantic Versioning](https://semver.org/).

## [0.2.1] - 2026-07-27

### Removed

- Read-only enforcement hook (`hooks/`). It was a plugin-level `PreToolUse` hook,
  so it stayed active for **every** session and repo while the plugin was
  enabled — blocking unrelated edits (e.g. in other repos) long after onboarding
  finished. The skill's read-only behavior is now guaranteed by its instructions
  in `SKILL.md` rather than a session-wide hook.

## [0.2.0] - 2026-07-27

### Added

- HTML output option: the skill now asks at write time whether to produce
  `ONBOARDING.md`, a self-contained interactive `ONBOARDING.html`, or both. The
  HTML page bundles inline CSS/JS (sticky table of contents, collapsible
  sections, styled tables, copy buttons) with no external dependencies.
- `references/onboarding-html-template.md` describing the HTML artifact.

### Changed

- Read-only hook now permits writing `ONBOARDING.html` in addition to
  `ONBOARDING.md`; all other write restrictions are unchanged.

## [0.1.0] - 2026-07-26

### Added

- Initial release of the `onboard-me` Claude Code plugin.
- Read-only repository onboarding skill that produces `ONBOARDING.md`.
- Stack detection reference and onboarding output template.
- Read-only safety hooks that block install/build/test commands and restrict
  writes to `ONBOARDING.md`.
- Marketplace metadata (`category`, `tags`, `version`) and plugin `displayName`.

[0.2.1]: https://github.com/mkhatri1-godaddy/onboard-me/releases/tag/v0.2.1
[0.2.0]: https://github.com/mkhatri1-godaddy/onboard-me/releases/tag/v0.2.0
[0.1.0]: https://github.com/mkhatri1-godaddy/onboard-me/releases/tag/v0.1.0
