# @acdl/cli

Install AI Context Docs Lifecycle skills and templates into any project.

## Requirements

- Node.js 18+

## Install

Run with `npx` (recommended):

```bash
npx @acdl/cli init
```

Or install globally:

```bash
npm install -g @acdl/cli
acdl --help
```

## Quick Start

From your project root:

```bash
npx @acdl/cli init
```

This installs selected module assets directly into your project (for example `.agents/skills/...` and optional `.cursor/rules/feature-workflow.mdc`).

After init, tell your AI assistant:

```text
load skill `acdl`
```

## What `init` Installs

Based on selected modules:

- Module 1: `.agents/skills/acdl`, `.agents/skills/agents-md`, `.agents/skills/doc-writing`
- Module 2: `.agents/skills/feature-workflow`, `.agents/skills/spec-writing`, optional `.cursor/rules/feature-workflow.mdc`
- Module 3: `.agents/skills/project-planning`

`init` does not auto-generate project-specific `AGENTS.md` or `docs/` content; skills/templates are installed so your AI can generate them.

## Commands

### `init`

Install selected module assets into the current project.

```bash
npx @acdl/cli init [options]
```

Options:

- `--force`: overwrite existing installed assets
- `-y, --yes`: accept default module selection (Modules 1 and 2)
- `--modules <list>`: explicit selection (`1,2,3` or `all`)
- `--skip-install`: skip module asset installation
- `--dry-run`: preview installation without writing files

## Local Development

From `packages/cli`:

```bash
npm install
npm run build
npm test
```

Run the built CLI locally:

```bash
node dist/bin.js --help
node dist/bin.js init
node dist/bin.js init --modules 1,2
node dist/bin.js init --force
```
