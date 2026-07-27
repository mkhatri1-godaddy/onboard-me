# ONBOARDING.html template

Use this when the user asks for **HTML** output. Write a single
`ONBOARDING.html` at the repo root that carries the **same nine sections plus the
stale-docs flag** as the Markdown template — only the presentation differs.

## Hard rules

- **Self-contained.** One file. All CSS in a `<style>` tag, all JS in a `<script>`
  tag. **No** external stylesheets, fonts, scripts, images, or CDN links, and
  **no** network calls — it must render fully offline and be safe to share as a
  file or link.
- **Same content discipline as Markdown.** Every command, path, and claim comes
  from a file you read or git output you ran. Replace every `{{...}}`. Omit a
  section only if genuinely not applicable, and leave a one-line note saying it
  was checked.
- **Escape real content.** HTML-escape anything pulled from the repo (`&lt;`,
  `&gt;`, `&amp;`) so code snippets and env values render literally and can't
  inject markup.
- **Accessible + responsive.** Semantic landmarks, a working light/dark scheme
  (`prefers-color-scheme`), keyboard-usable controls, and a layout that collapses
  to one column on narrow screens.

## Interactive features to include

- **Sticky table of contents** — a sidebar (or top bar on mobile) linking to each
  section, highlighting the section currently in view.
- **Collapsible sections** — use native `<details>`/`<summary>` so sections fold
  without any JS dependency; default the first few open.
- **Styled tables** for the directory map, env vars, and reading list.
- **Clickable file paths** — render paths as `<a>` links using the repo's remote
  (derive the `blob/<branch>` base URL from `git remote get-url origin`); if no
  remote is known, leave them as plain `<code>`.
- **Copy buttons** on command blocks (progressive enhancement — the block still
  reads fine if JS is disabled).

## Diagrams

Add lightweight, hand-authored inline SVG diagrams — **no libraries, no CDN, no
Mermaid**. Three are wired into the skeleton:

- **Architecture** ("System at a glance", §1) — a box-and-arrow view of the major
  components and the external systems they talk to.
- **Main flow** (§1) — the primary request/data path, left to right.
- **Directory tree** (§2) — a visual `ul.tree` above the path table.

Rules:

- **Redraw per repo — do not reproduce the example's shape.** The SVG blocks
  below are an illustration of the *technique*, not a layout to fill in. Build
  each diagram from the actual system: choose the node count, the arrangement
  (layered, left-to-right pipeline, hub-and-spoke, client→server→store, etc.),
  the edges, and the `viewBox`/coordinates that fit *this* repo. Two different
  repos must produce two visibly different diagrams — a CLI tool, a REST service,
  and a monorepo should not share a silhouette. Recompute the `x`/`y` values for
  your real node count rather than keeping the example's three-in-a-row.
- **Only from real findings.** Draw a component, edge, or dependency only if you
  saw it in the code or config. Never invent topology to fill the picture. If the
  architecture or flow isn't clear from the repo, **omit that diagram** and keep
  the prose/table — an absent diagram beats a wrong one. Not every repo warrants
  all three (e.g. a library may have no "main flow").
- **Keep it legible.** Aim for ≲6 nodes. If the system is larger, diagram the core
  and describe the rest in prose. Label every node and every edge with the repo's
  real component/service names, not generic ones.
- **Theme-aware.** Style SVG only via the provided classes (`.node`, `.node-ext`,
  `.label`, `.sublabel`, `.edge`, `.edge-label`) so it tracks light/dark. Do not
  put hex colors on SVG elements.
- **Responsive + accessible.** Keep `viewBox` (the CSS sizes it); don't set fixed
  pixel `width`/`height` on `<svg>`. Give each `<svg>` `role="img"` and a
  `<title>` (add `<desc>` for the architecture). Reuse the shared `#arrow` marker.

## Skeleton

Fill in the placeholders; keep it a single file.

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Onboarding: {{project name}}</title>
<style>
  :root {
    color-scheme: light dark;
    --bg: #ffffff; --fg: #1a1a1a; --muted: #666; --border: #e2e2e2;
    --accent: #2563eb; --code-bg: #f4f4f5; --card: #fafafa;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #0f1115; --fg: #e6e6e6; --muted: #9aa0a6; --border: #2a2d34;
      --accent: #6ea8fe; --code-bg: #1a1d23; --card: #161920;
    }
  }
  * { box-sizing: border-box; }
  body {
    margin: 0; background: var(--bg); color: var(--fg);
    font: 16px/1.6 system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
  }
  .layout { display: grid; grid-template-columns: 260px 1fr; gap: 2rem;
            max-width: 1100px; margin: 0 auto; padding: 2rem; }
  nav.toc { position: sticky; top: 1rem; align-self: start; font-size: 0.9rem; }
  nav.toc a { display: block; padding: 0.25rem 0; color: var(--muted);
              text-decoration: none; }
  nav.toc a.active, nav.toc a:hover { color: var(--accent); }
  main { min-width: 0; }
  h1 { margin-top: 0; }
  .meta { color: var(--muted); font-size: 0.9rem; border-left: 3px solid var(--border);
          padding-left: 0.75rem; }
  details { border: 1px solid var(--border); border-radius: 8px;
            background: var(--card); margin: 1rem 0; padding: 0.5rem 1rem; }
  details > summary { cursor: pointer; font-weight: 600; font-size: 1.15rem;
                      padding: 0.5rem 0; list-style: none; }
  details > summary::before { content: "▸ "; color: var(--accent); }
  details[open] > summary::before { content: "▾ "; }
  table { border-collapse: collapse; width: 100%; margin: 0.5rem 0; }
  th, td { border: 1px solid var(--border); padding: 0.5rem 0.75rem;
           text-align: left; vertical-align: top; }
  th { background: var(--code-bg); }
  code { background: var(--code-bg); padding: 0.1rem 0.35rem; border-radius: 4px;
         font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.9em; }
  pre { position: relative; background: var(--code-bg); padding: 1rem;
        border-radius: 8px; overflow: auto; }
  pre code { background: none; padding: 0; }
  .copy-btn { position: absolute; top: 0.5rem; right: 0.5rem; font-size: 0.75rem;
              border: 1px solid var(--border); background: var(--bg); color: var(--fg);
              border-radius: 4px; padding: 0.15rem 0.5rem; cursor: pointer; }
  .warn { border-color: #d97706; }
  /* Diagrams: hand-authored inline SVG, styled by class so they adapt to the
     theme via CSS vars. Never hardcode hex colors on the SVG elements. */
  figure.diagram { margin: 1rem 0; }
  figure.diagram svg { width: 100%; height: auto; max-width: 720px; display: block; }
  figure.diagram figcaption { color: var(--muted); font-size: 0.8rem; margin-top: 0.35rem; }
  .diagram .node { fill: var(--card); stroke: var(--accent); stroke-width: 1.5; }
  .diagram .node-ext { fill: var(--code-bg); stroke: var(--muted); stroke-dasharray: 4 3; }
  .diagram .label { fill: var(--fg); font: 600 13px system-ui, sans-serif; text-anchor: middle; }
  .diagram .sublabel { fill: var(--muted); font: 11px system-ui, sans-serif; text-anchor: middle; }
  .diagram .edge { stroke: var(--muted); stroke-width: 1.5; fill: none; marker-end: url(#arrow); }
  .diagram .edge-label { fill: var(--muted); font: 11px system-ui, sans-serif; text-anchor: middle; }
  #arrow path { fill: var(--muted); }
  /* Visual directory tree */
  ul.tree, ul.tree ul { list-style: none; }
  ul.tree { margin: 0.5rem 0; padding-left: 0;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.9rem; }
  ul.tree ul { margin: 0; padding-left: 1.1rem; border-left: 1px solid var(--border); }
  ul.tree li { padding: 0.12rem 0; }
  ul.tree .dir { color: var(--accent); font-weight: 600; }
  ul.tree .note { color: var(--muted); font-family: system-ui, sans-serif; }
  @media (max-width: 720px) {
    .layout { grid-template-columns: 1fr; }
    nav.toc { position: static; }
  }
</style>
</head>
<body>
<!-- Shared SVG defs (arrow marker), used by every diagram. Styled via #arrow in CSS. -->
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0 0 L10 5 L0 10 z"/>
  </marker>
</defs></svg>
<div class="layout">
  <nav class="toc" aria-label="Table of contents">
    <strong>{{project name}}</strong>
    <a href="#what">1. What this is</a>
    <a href="#structure">2. Directory structure</a>
    <a href="#setup">3. Setup</a>
    <a href="#conventions">4. Conventions</a>
    <a href="#pr">5. Pull request process</a>
    <a href="#deploy">6. Deployment</a>
    <a href="#links">7. Docs &amp; links</a>
    <a href="#reading">8. Start here</a>
    <a href="#glossary">9. Glossary</a>
    <a href="#stale">⚠️ Stale docs</a>
  </nav>
  <main>
    <h1>Onboarding: {{project name}}</h1>
    <p class="meta">
      Generated by the <code>onboard-me</code> skill on {{date}}.<br>
      Read-only snapshot — verify commands against the current source before relying on them.
    </p>

    <details id="what" open>
      <summary>1. What this project is</summary>
      <p>{{2–4 sentences: purpose, audience, problem solved}}</p>
      <table>
        <tr><th>Language(s)</th><td>{{...}}</td></tr>
        <tr><th>Framework(s)</th><td>{{...}}</td></tr>
        <tr><th>Runtime</th><td>{{...}}</td></tr>
        <tr><th>Package manager / task runner</th><td>{{...}}</td></tr>
        <tr><th>Data stores / services</th><td>{{...}}</td></tr>
        <tr><th>Repo shape</th><td>{{single package | monorepo with N packages}}</td></tr>
      </table>

      <h3 style="margin:1.5rem 0 0.25rem">System at a glance</h3>
      <figure class="diagram">
        <svg viewBox="0 0 640 170" role="img" aria-labelledby="arch-t arch-d">
          <title id="arch-t">{{project name}} architecture</title>
          <desc id="arch-d">{{one line naming the components shown and how they connect}}</desc>
          <!-- Example layout only — redraw for THIS repo: set the node count, arrangement,
               and x/y coordinates (and viewBox) to match. One rect + label(s) per real
               component; solid = in-repo, dashed (node-ext) = external. -->
          <rect class="node" x="30" y="60" width="150" height="56" rx="8"/>
          <text class="label" x="105" y="84">{{component A}}</text>
          <text class="sublabel" x="105" y="102">{{role}}</text>

          <rect class="node" x="245" y="60" width="150" height="56" rx="8"/>
          <text class="label" x="320" y="84">{{component B}}</text>
          <text class="sublabel" x="320" y="102">{{role}}</text>

          <rect class="node node-ext" x="460" y="60" width="150" height="56" rx="8"/>
          <text class="label" x="535" y="84">{{external service}}</text>
          <text class="sublabel" x="535" y="102">{{e.g. third-party API}}</text>

          <path class="edge" d="M180 88 H245"/>
          <text class="edge-label" x="212" y="80">{{calls}}</text>
          <path class="edge" d="M395 88 H460"/>
          <text class="edge-label" x="427" y="80">{{HTTPS}}</text>
        </svg>
        <figcaption>Solid boxes are components in this repo; dashed are external systems. Only draw components and edges found in the code/config.</figcaption>
      </figure>

      <h3 style="margin:1.5rem 0 0.25rem">Main flow</h3>
      <figure class="diagram">
        <svg viewBox="0 0 640 70" role="img" aria-labelledby="flow-t">
          <title id="flow-t">{{primary request / data flow}}</title>
          <!-- Example only — use the real steps of this repo's main path (count and
               names), or a different arrangement if it fits better. -->
          <rect class="node" x="10"  y="18" width="130" height="40" rx="8"/>
          <text class="label" x="75"  y="43">{{trigger / input}}</text>
          <rect class="node" x="180" y="18" width="130" height="40" rx="8"/>
          <text class="label" x="245" y="43">{{processing}}</text>
          <rect class="node" x="350" y="18" width="130" height="40" rx="8"/>
          <text class="label" x="415" y="43">{{external call}}</text>
          <rect class="node" x="520" y="18" width="110" height="40" rx="8"/>
          <text class="label" x="575" y="43">{{result}}</text>
          <path class="edge" d="M140 38 H180"/>
          <path class="edge" d="M310 38 H350"/>
          <path class="edge" d="M480 38 H520"/>
        </svg>
        <figcaption>The main integration path, step by step. Omit if the repo doesn't make one clear.</figcaption>
      </figure>
    </details>

    <details id="structure" open>
      <summary>2. Directory structure</summary>
      <ul class="tree">
        <li><span class="dir">{{repo root}}/</span>
          <ul>
            <li><span class="dir">{{dir}}/</span> <span class="note">{{one-line purpose}}</span>
              <ul>
                <li><code>{{key file}}</code> <span class="note">{{why it matters}}</span></li>
              </ul>
            </li>
            <li><span class="dir">{{dir}}/</span> <span class="note">{{one-line purpose}}</span></li>
          </ul>
        </li>
      </ul>
      <table>
        <thead><tr><th>Path</th><th>Purpose</th></tr></thead>
        <tbody>
          <tr><td><code>{{dir}}/</code></td><td>{{what it holds}}</td></tr>
        </tbody>
      </table>
      <p>{{optional: how the pieces fit together; where entry points live}}</p>
    </details>

    <details id="setup" open>
      <summary>3. Setup</summary>
      <p class="meta">Commands extracted from {{sources}}. Not executed by the generator.</p>
      <p><strong>Prerequisites:</strong> {{...}}</p>
      <pre><button class="copy-btn">Copy</button><code># 1. Install dependencies
{{install command}}

# 2. Configure environment
{{cp .env.example .env, then fill in values}}

# 3. Build (if needed)
{{build command}}

# 4. Run
{{run / dev-server command}}

# 5. Test
{{test command}}</code></pre>
      <p><strong>Environment variables</strong></p>
      <table>
        <thead><tr><th>Variable</th><th>Purpose</th><th>Required?</th></tr></thead>
        <tbody>
          <tr><td><code>{{VAR}}</code></td><td>{{...}}</td><td>{{yes/no}}</td></tr>
        </tbody>
      </table>
      <p><strong>Local services required:</strong> {{service — how it's provided}}</p>
    </details>

    <details id="conventions">
      <summary>4. Conventions</summary>
      <ul>
        <li><strong>Testing:</strong> {{framework, where tests live, subset command}}</li>
        <li><strong>Lint / format:</strong> {{tools + config files}}</li>
        <li><strong>Commit style:</strong> {{if evident}}</li>
        <li><strong>Code style notes:</strong> {{from CONTRIBUTING / CLAUDE.md}}</li>
      </ul>
    </details>

    <details id="pr">
      <summary>5. Pull request process</summary>
      <p>{{branch naming, base branch, required checks, review rules, PR template.
        If none documented: "No formal PR process documented."}}</p>
    </details>

    <details id="deploy">
      <summary>6. Deployment</summary>
      <p>{{how/where deployed, what triggers it, environments. If none:
        "No deployment configuration found in the repo."}}</p>
    </details>

    <details id="links">
      <summary>7. Documentation &amp; useful links</summary>
      <ul>
        <li>{{README / docs site}}</li>
        <li>{{CONTRIBUTING, ARCHITECTURE, ADRs}}</li>
        <li>{{external links: wiki, API docs, dashboards, issue tracker, chat, homepage}}</li>
      </ul>
    </details>

    <details id="reading" open>
      <summary>8. Start here — reading list</summary>
      <ol>
        <li><a href="{{file url}}"><code>{{path}}</code></a> — {{why it's a good first read}}</li>
      </ol>
    </details>

    <details id="glossary">
      <summary>9. Glossary</summary>
      <ul>
        <li><strong>{{term}}</strong> — {{plain-language definition}}</li>
      </ul>
    </details>

    <details id="stale" class="warn">
      <summary>⚠️ Docs that may be stale</summary>
      <p>{{mismatches between docs and code. If none: "None found."}}</p>
    </details>
  </main>
</div>
<script>
  // Copy buttons (progressive enhancement).
  for (const btn of document.querySelectorAll('.copy-btn')) {
    btn.addEventListener('click', () => {
      const code = btn.parentElement.querySelector('code');
      navigator.clipboard.writeText(code.innerText).then(() => {
        const prev = btn.textContent; btn.textContent = 'Copied';
        setTimeout(() => { btn.textContent = prev; }, 1200);
      });
    });
  }
  // Highlight the TOC entry for the section in view.
  const links = new Map([...document.querySelectorAll('nav.toc a')]
    .map(a => [a.getAttribute('href').slice(1), a]));
  const obs = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        links.forEach(a => a.classList.remove('active'));
        links.get(e.target.id)?.classList.add('active');
      }
    }
  }, { rootMargin: '-30% 0px -60% 0px' });
  document.querySelectorAll('main details[id]').forEach(s => obs.observe(s));
</script>
</body>
</html>
```
