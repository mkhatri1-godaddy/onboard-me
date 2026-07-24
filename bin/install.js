#!/usr/bin/env node
'use strict';

/**
 * onboard-me installer.
 *
 * Copies the bundled `onboard-me` Claude Code skill into a skills directory so
 * Claude Code auto-discovers it. Runs with no dependencies via `npx onboard-me`.
 *
 *   npx onboard-me              # install for your user (~/.claude/skills)
 *   npx onboard-me --project    # install into the current repo (./.claude/skills)
 *   npx onboard-me --force      # overwrite an existing install
 *   npx onboard-me --help
 */

const fs = require('fs');
const os = require('os');
const path = require('path');

const SKILL_NAME = 'onboard-me';
const args = process.argv.slice(2);
const has = (...flags) => flags.some((f) => args.includes(f));

if (has('-h', '--help')) {
  printHelp();
  process.exit(0);
}

const projectScope = has('-p', '--project');
const force = has('-f', '--force');

const sourceDir = path.join(__dirname, '..', 'skills', SKILL_NAME);
const baseDir = projectScope
  ? path.join(process.cwd(), '.claude', 'skills')
  : path.join(os.homedir(), '.claude', 'skills');
const targetDir = path.join(baseDir, SKILL_NAME);

if (!fs.existsSync(path.join(sourceDir, 'SKILL.md'))) {
  fail(`Could not find the bundled skill at ${sourceDir}`);
}

if (fs.existsSync(targetDir) && !force) {
  fail(
    `"${SKILL_NAME}" is already installed at:\n    ${targetDir}\n\n` +
      '  Re-run with --force to overwrite it.',
  );
}

try {
  fs.mkdirSync(baseDir, { recursive: true });
  fs.rmSync(targetDir, { recursive: true, force: true });
  fs.cpSync(sourceDir, targetDir, { recursive: true });
} catch (err) {
  fail(`Failed to copy the skill: ${err.message}`);
}

const scopeLabel = projectScope ? 'this project' : 'your user account';
console.log(`\n✔ Installed the "${SKILL_NAME}" skill for ${scopeLabel}:`);
console.log(`    ${targetDir}\n`);
console.log('Start a Claude Code session in any repo and run:');
console.log('    /onboard-me            full tour of the current repo');
console.log('    /onboard-me backend    weight the tour toward a focus area\n');

function printHelp() {
  console.log(`
onboard-me — install the Claude Code onboarding skill

Usage:
  npx onboard-me [options]

Options:
  -p, --project   Install into the current repo (./.claude/skills) instead of
                  your user account (~/.claude/skills).
  -f, --force     Overwrite an existing installation.
  -h, --help      Show this help.

After installing, run /onboard-me inside any repository in Claude Code.
`);
}

function fail(message) {
  console.error(`✖ ${message}`);
  process.exit(1);
}
