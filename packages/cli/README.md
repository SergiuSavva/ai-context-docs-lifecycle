# @acdl/cli

Initialize AI Context Docs Lifecycle files in any project.

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
# Initialize local methodology files in .acdl/
npx @acdl/cli init
```

If `.acdl/` already exists:

```bash
npx @acdl/cli init --force
```

After init, ask your AI assistant to bootstrap using the local workflow:

```text
Bootstrap AGENTS.md for this project.
Follow: .acdl/content/modules/01-project-context/bootstrap-workflow.md
```

## What `init` Creates

- `.acdl/content/` (full bundled methodology scaffold from this package)
- `.acdl/version` (current CLI version)

`init` does not generate `AGENTS.md` or `docs/` directly; it installs the local methodology content your AI assistant uses for bootstrap.

## Commands

### `init`

Initialize `.acdl/` with bundled methodology content.

```bash
npx @acdl/cli init [options]
```

Options:

- `--force`: Re-initialize over an existing `.acdl/`

Behavior:

- Fails if `.acdl/` already exists and `--force` is not provided
- Replaces `.acdl/content/` with the bundled content
- Writes/updates `.acdl/version`

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
node dist/bin.js init --force
```
