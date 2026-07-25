#!/usr/bin/env bash
# PreToolUse hook for onboard-me: enforce read-only repo investigation.
# Allows writes only to ONBOARDING.md; blocks install/build/test/run commands.
set -euo pipefail

input=$(cat)
tool_name=$(printf '%s' "$input" | jq -r '.tool_name // ""')

deny() {
  local reason=$1
  jq -n \
    --arg reason "$reason" \
    '{
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason: $reason
      }
    }'
  exit 0
}

case "$tool_name" in
  Bash)
    command=$(printf '%s' "$input" | jq -r '.tool_input.command // ""')
    normalized=$(printf '%s' "$command" | tr '[:upper:]' '[:lower:]')

    # Block package managers and dependency installs
    if printf '%s' "$normalized" | grep -qE \
      '(^|[;&|[:space:]])(npm|yarn|pnpm|bun)[[:space:]]+(install|ci|run|exec|start|test|build|dev|add|remove|update|uninstall)'; then
      deny "onboard-me is read-only: blocked package-manager command. Extract commands from docs instead of running them."
    fi

    # Block Python / Ruby / PHP / Elixir tooling
    if printf '%s' "$normalized" | grep -qE \
      '(^|[;&|[:space:]])(pip|pipenv|poetry|uv|bundle|composer|mix)[[:space:]]+(install|sync|run|exec|test|build|update|require)'; then
      deny "onboard-me is read-only: blocked language tooling command. Extract commands from docs instead of running them."
    fi

    if printf '%s' "$normalized" | grep -qE \
      '(^|[;&|[:space:]])mix[[:space:]]+phx'; then
      deny "onboard-me is read-only: blocked Elixir server command. Extract commands from docs instead of running them."
    fi

    # Block Rust / Go / Java build tooling
    if printf '%s' "$normalized" | grep -qE \
      '(^|[;&|[:space:]])(cargo|go|mvn|gradle|\./mvnw|\./gradlew)[[:space:]]+(build|run|test|install|package|compile|verify|spring-boot:run)'; then
      deny "onboard-me is read-only: blocked build/test command. Extract commands from docs instead of running them."
    fi

    # Block Docker and common task runners
    if printf '%s' "$normalized" | grep -qE \
      '(^|[;&|[:space:]])(docker|docker-compose|podman)[[:space:]]+(run|build|compose|up|start|exec)'; then
      deny "onboard-me is read-only: blocked container command. Extract setup from docker-compose/docs instead of running it."
    fi

    if printf '%s' "$normalized" | grep -qE \
      '(^|[;&|[:space:]])(make|just|task|nix)[[:space:]]'; then
      deny "onboard-me is read-only: blocked task-runner command. Read Makefile/Justfile/Taskfile instead of executing it."
    fi

    # Block direct test runners
    if printf '%s' "$normalized" | grep -qE \
      '(^|[;&|[:space:]])(pytest|jest|vitest|mocha|rspec|phpunit|dotnet[[:space:]]+test)[[:space:]]'; then
      deny "onboard-me is read-only: blocked test command. Document how to run tests without executing them."
    fi

    # Block mutating git operations (read-only git is fine)
    if printf '%s' "$normalized" | grep -qE \
      '(^|[;&|[:space:]])git[[:space:]]+(commit|push|pull|merge|rebase|checkout|switch|reset|clean|stash|tag|cherry-pick|revert|am)'; then
      deny "onboard-me is read-only: blocked mutating git command."
    fi
    ;;

  Write|Edit)
    file_path=$(printf '%s' "$input" | jq -r '.tool_input.file_path // ""')
    basename=$(basename "$file_path")

    if [[ "$basename" != "ONBOARDING.md" ]]; then
      deny "onboard-me may only write ONBOARDING.md. Blocked edit to: $file_path"
    fi
    ;;

  *)
    exit 0
    ;;
esac

exit 0
