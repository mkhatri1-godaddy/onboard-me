#!/usr/bin/env node
'use strict';

/**
 * onboard-me installer.
 *
 * Copies the bundled `onboard-me` Claude Code skill into a skills directory so
 * Claude Code auto-discovers it. Runs with no dependencies via `npx onboard-me`.
 *
 * Run interactively, it asks whether to install for your user or this project.
 * Pass a scope flag to skip the prompt (useful in scripts / CI):
 *
 *   npx onboard-me              # prompts: user account or this project?
 *   npx onboard-me --user       # install for your user (~/.claude/skills)
 *   npx onboard-me --project    # install into the current repo (./.claude/skills)
 *   npx onboard-me --force      # overwrite an existing install
 *   npx onboard-me --help
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const readline = require('readline');

const SKILL_NAME = 'onboard-me';
const args = process.argv.slice(2);
const has = (...flags) => flags.some((f) => args.includes(f));

if (has('-h', '--help')) {
  printHelp();
  process.exit(0);
}

const force = has('-f', '--force');

// Explicit scope flags skip the prompt entirely.
let scope = null;
if (has('-p', '--project')) {
  scope = 'project';
} else if (has('-u', '--user')) {
  scope = 'user';
}

main().catch((err) => fail(err.message));

async function main() {
  const sourceDir = path.join(__dirname, '..', 'skills', SKILL_NAME);
  if (!fs.existsSync(path.join(sourceDir, 'SKILL.md'))) {
    fail(`Could not find the bundled skill at ${sourceDir}`);
  }

  if (scope === null) {
    scope = await promptScope();
  }

  const baseDir =
    scope === 'project'
      ? path.join(process.cwd(), '.claude', 'skills')
      : path.join(os.homedir(), '.claude', 'skills');
  const targetDir = path.join(baseDir, SKILL_NAME);

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

  const scopeLabel = scope === 'project' ? 'this project' : 'your user account';
  console.log(`\n✔ Installed the "${SKILL_NAME}" skill for ${scopeLabel}:`);
  console.log(`    ${targetDir}\n`);
  console.log('Start a Claude Code session in any repository and run:');
  console.log('    /onboard-me\n');
}

/**
 * Ask where to install. Only prompts when attached to an interactive terminal;
 * otherwise (piped input, CI) defaults to user scope so the process never hangs.
 */
async function promptScope() {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    console.log(
      'No interactive terminal detected — defaulting to user install (~/.claude/skills).\n' +
        'Pass --project or --user to choose explicitly.',
    );
    return 'user';
  }

  const userPath = path.join(os.homedir(), '.claude', 'skills', SKILL_NAME);
  const projectPath = path.join(process.cwd(), '.claude', 'skills', SKILL_NAME);
  const question =
    `\nWhere should the "${SKILL_NAME}" skill be installed?\n\n` +
    `  1) Your user account   ${userPath}\n` +
    `                         (available in every repo on this machine)\n` +
    `  2) This project        ${projectPath}\n` +
    `                         (committed to this repo, shared with your team)\n\n` +
    'Choose [1/2] (default 1): ';

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    let settled = false;
    const done = (value) => {
      if (settled) return;
      settled = true;
      rl.close();
      resolve(value);
    };

    // EOF (Ctrl-D) or a closed stream accepts the default rather than hanging.
    // Deferred so a line typed just before the stream closes still wins.
    rl.on('close', () => setImmediate(() => done('user')));

    const askOnce = () => {
      rl.question(question, (raw) => {
        const answer = (raw || '').trim().toLowerCase();
        if (answer === '' || answer === '1' || answer === 'u' || answer === 'user') {
          return done('user');
        }
        if (answer === '2' || answer === 'p' || answer === 'project') {
          return done('project');
        }
        console.log(`  Please enter 1 or 2 (got "${answer}").`);
        askOnce();
      });
    };
    askOnce();
  });
}

function printHelp() {
  console.log(`
onboard-me — install the Claude Code onboarding skill

Usage:
  npx onboard-me [options]

Run with no options, it asks whether to install for your user or this project.

Options:
  -u, --user      Install for your user account (~/.claude/skills). Skips the prompt.
  -p, --project   Install into the current repo (./.claude/skills). Skips the prompt.
  -f, --force     Overwrite an existing installation.
  -h, --help      Show this help.

After installing, run /onboard-me inside any repository in Claude Code.
`);
}

function fail(message) {
  console.error(`✖ ${message}`);
  process.exit(1);
}
