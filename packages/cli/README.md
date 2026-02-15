# @acdl/cli

Initialize and maintain AI Context Docs in any project.

## Requirements

- Node.js 18+

## Install

Run with `npx` (recommended, no global install):

```bash
npx @acdl/cli init
```

Or install globally:

```bash
npm install -g @acdl/cli
acdl --help
```

## Quick Start

From the root of your target project:

```bash
# 1) Initialize .acdl/ and generate managed files
npx @acdl/cli init --yes

# Optional: pre-generate docs templates (default is no docs)
npx @acdl/cli init --yes --with-docs architecture,api

# 2) Preview managed updates (dry-run by default)
npx @acdl/cli update

# 3) Apply managed updates
npx @acdl/cli update --apply

# 4) Verify config, markers, and managed file integrity
npx @acdl/cli doctor
```

After `init`, the CLI creates:

- `.acdl/config.toml`
- `.acdl/templates/`
- `.acdl/content/` (full methodology scaffold)
- `AGENTS.md`
- `docs/` files (only when `--with-docs` is used)

## Commands

### `init`

Initialize `.acdl/` control plane and render managed files.

```bash
npx @acdl/cli init [options]
```

Options:

- `--with-docs <docs>`: Comma-separated docs to enable.
  - Supported values: `architecture,api,auth,data_model,scripts`
  - Default: none (AI agent can create docs using guides)
- `--force`: Re-initialize over an existing `.acdl/`
- `--yes`: Skip confirmation prompts and use defaults

Example:

```bash
npx @acdl/cli init --yes --with-docs architecture,api
```

### `update`

Compare managed blocks against templates and show/apply changes.

```bash
npx @acdl/cli update [options]
```

Options:

- `--apply`: Apply managed changes (without this, `update` is dry-run)
- `--verbose`: Show full diff output in dry-run mode

Examples:

```bash
# Dry-run summary
npx @acdl/cli update

# Apply changes to managed blocks
npx @acdl/cli update --apply
```

### `doctor`

Validate `.acdl/` setup and managed file integrity.

```bash
npx @acdl/cli doctor
```

What it checks:

- `.acdl/` exists
- `.acdl/config.toml` is valid
- `.acdl/templates/` exists
- expected managed files exist
- managed markers are present and valid

## Managed Markers

Generated content is wrapped in managed markers. `update --apply` only patches content inside these markers and preserves user content outside of them.

## Local Development

From `packages/cli`:

```bash
npm install
npm run build
npm test
```

Run the local built CLI:

```bash
node dist/bin.js --help
node dist/bin.js init --yes
```
