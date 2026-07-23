# Stack detection lookup

Map files found in the repo to the ecosystem they imply. A repo can match
several rows — record all of them and pick the primary by source-file volume.

## Manifests & lockfiles → ecosystem

| File(s) present | Language / runtime | Package manager | Notes |
|---|---|---|---|
| `package.json` + `package-lock.json` | JavaScript / Node | npm | Check `scripts`, `engines`, `type` |
| `package.json` + `yarn.lock` | JavaScript / Node | Yarn | |
| `package.json` + `pnpm-lock.yaml` | JavaScript / Node | pnpm | Check `pnpm-workspace.yaml` for monorepo |
| `package.json` + `bun.lockb` | JavaScript / Node | Bun | |
| `tsconfig.json` | TypeScript | — | Compiler config; pair with a JS manifest |
| `pyproject.toml` | Python | Poetry / PDM / uv / hatch | Read `[build-system]` & `[tool.*]` |
| `requirements*.txt` | Python | pip | |
| `Pipfile` / `Pipfile.lock` | Python | pipenv | |
| `setup.py` / `setup.cfg` | Python | setuptools | Older style |
| `go.mod` / `go.sum` | Go | go modules | Module path = import root |
| `Cargo.toml` / `Cargo.lock` | Rust | cargo | `[workspace]` = monorepo |
| `pom.xml` | Java | Maven | |
| `build.gradle(.kts)` | Java / Kotlin | Gradle | |
| `Gemfile` / `Gemfile.lock` | Ruby | Bundler | Rails if `config/routes.rb` |
| `composer.json` | PHP | Composer | Laravel if `artisan` present |
| `*.csproj` / `*.sln` | C# / .NET | NuGet / dotnet | |
| `mix.exs` | Elixir | mix | Phoenix if `lib/*_web` |
| `pubspec.yaml` | Dart / Flutter | pub | |
| `CMakeLists.txt` / `Makefile` | C / C++ | make / cmake | |
| `deno.json` / `deno.jsonc` | TypeScript / Deno | Deno | |

## Framework signals (source-level)

| Signal | Framework |
|---|---|
| `next.config.*` | Next.js |
| `vite.config.*` | Vite |
| `angular.json` | Angular |
| `svelte.config.*` | Svelte / SvelteKit |
| `nuxt.config.*` | Nuxt |
| `remix.config.*` | Remix |
| `manage.py` + `settings.py` | Django |
| `app.py` / `flask` in deps | Flask |
| `fastapi` in deps | FastAPI |
| `config/routes.rb` | Rails |
| `artisan` | Laravel |
| `lib/*_web/` + `mix.exs` | Phoenix |
| `Chart.yaml` | Helm chart |
| `main.tf` / `*.tf` | Terraform |

## Monorepo & tooling signals

| Signal | Meaning |
|---|---|
| `pnpm-workspace.yaml`, `lerna.json`, `nx.json`, `turbo.json` | JS monorepo |
| `[workspace]` in `Cargo.toml` | Rust workspace |
| `go.work` | Go multi-module workspace |
| `Makefile`, `Justfile`, `Taskfile.yml` | Task runner — primary source of commands |
| `.pre-commit-config.yaml` | pre-commit hooks |
| `.editorconfig`, `.prettierrc`, `eslint*`, `ruff.toml`, `.rubocop.yml` | Lint/format conventions |

## CI / deployment signals

| Path | System |
|---|---|
| `.github/workflows/**` | GitHub Actions |
| `.gitlab-ci.yml` | GitLab CI |
| `.circleci/config.yml` | CircleCI |
| `Jenkinsfile` | Jenkins |
| `azure-pipelines.yml` | Azure Pipelines |
| `Dockerfile`, `docker-compose*.yml` | Containerized; compose lists local services |
| `k8s/**`, `*.yaml` with `kind:` | Kubernetes manifests |
| `vercel.json`, `netlify.toml`, `fly.toml`, `render.yaml` | PaaS deploy target |
