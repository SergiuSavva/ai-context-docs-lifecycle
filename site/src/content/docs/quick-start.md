---
title: Quick Start
description: Set up AI-First Dev Kit in 5 minutes with help from your AI assistant
head: []
---

Let your AI agent set up the methodology for you. Works with Cursor, Claude Code, or any AI assistant.

## Step 1: Copy the Prompt

Open your AI coding assistant and paste this:

```
Apply the AI-First Dev Kit methodology to this project.

STEP 1: Detect project type
Check for these markers:
- packages/ or apps/ folder, pnpm-workspace.yaml, turbo.json, nx.json, lerna.json → PACKAGE MONOREPO
- services/ folder, docker-compose.yml with multiple services → SERVICE MONOREPO  
- None of above → SINGLE APP

STEP 2: Analyze the project
- Read package.json / requirements.txt / pyproject.toml for tech stack
- Scan code folders for structure and patterns
- For monorepos: identify each package/service and its purpose

STEP 3: Create folder structure
mkdir -p .cursor/rules docs/specs/_archive docs/features docs/decisions

STEP 4: Create required files based on project type

FOR ALL TYPES:
| File | Template URL | Required Sections |
|------|--------------|-------------------|
| AGENTS.md | https://ai-first-dev-kit.github.io/templates/agents-md/ | Quick Start, Tech Stack, File Organization, Key Patterns |
| .cursor/rules/00-index.mdc | https://ai-first-dev-kit.github.io/templates/cursor-rules/ | YAML frontmatter, Rules table |
| docs/INDEX.md | https://ai-first-dev-kit.github.io/templates/docs-index/ | Links to all doc folders |
| docs/TASKS.md | https://ai-first-dev-kit.github.io/templates/docs-index/ | In Progress, Completed sections |

FOR MONOREPOS ONLY (additional files):
- Create AGENTS.md in EACH package/ or service/ folder
- Root AGENTS.md should list all packages/services with links
- Each package AGENTS.md focuses on that component only

STEP 5: Customize with real values
- Use actual commands from package.json scripts
- Use actual dependencies, not placeholders
- Map actual folder structure
- Document patterns found in the code

Full methodology: https://ai-first-dev-kit.github.io/methodology/
```

## Step 2: What AI Should Discover

Before generating files, AI should find these in your project:

| Look For | Where | Use In |
|----------|-------|--------|
| Project type | `packages/`, `apps/`, `services/`, workspace configs | Structure decision |
| Install/run commands | `package.json` scripts, `Makefile` | Quick Start section |
| Dependencies | `package.json`, `requirements.txt` | Tech Stack table |
| Code structure | `src/`, `app/`, `lib/` folders | File Organization |
| Test framework | `jest.config`, `pytest.ini`, test files | Testing rules |
| Existing patterns | Repeated code structures | Key Patterns section |

### Monorepo Detection

| Marker | Project Type |
|--------|--------------|
| `packages/` or `apps/` folder | Package monorepo |
| `pnpm-workspace.yaml`, `turbo.json`, `nx.json`, `lerna.json` | Package monorepo |
| `services/` folder | Service monorepo |
| `docker-compose.yml` with multiple services | Service monorepo |
| None of above | Single app |

## Step 3: Verify Setup

After AI completes, check these files exist and contain **real values**:

### Single App Structure

```
your-project/
├── AGENTS.md                    # ✅ Has actual tech stack, real commands
├── .cursor/rules/
│   └── 00-index.mdc            # ✅ Lists rules for YOUR stack
└── docs/
    ├── INDEX.md                # ✅ Links to YOUR docs
    ├── TASKS.md                # ✅ Ready for tasks
    ├── specs/                  # ✅ For future specs
    ├── features/               # ✅ For feature docs
    └── decisions/              # ✅ For ADRs
```

### Monorepo Structure (Package or Service)

```
your-monorepo/
├── AGENTS.md                    # ✅ Root overview, links to all packages
├── .cursor/rules/
│   └── 00-index.mdc            # ✅ Shared rules for all packages
├── packages/                    # or services/
│   ├── web/
│   │   └── AGENTS.md           # ✅ Web-specific context
│   └── api/
│       └── AGENTS.md           # ✅ API-specific context
└── docs/
    ├── INDEX.md                # ✅ Links to all docs
    ├── TASKS.md                # ✅ Tracks work across packages
    ├── specs/
    ├── features/
    └── decisions/
```

### Quick Verification

Ask your AI:
```
Verify the AI-First Dev Kit setup:
1. Does AGENTS.md contain real project commands that work?
2. Does the Tech Stack table reflect actual dependencies?
3. Are the Key Patterns based on actual code in this repo?
4. (For monorepos) Does each package/service have its own AGENTS.md?
```

## Step 4: Start Building

Setup complete! Now use the [Development Workflow](/workflow/) for day-to-day prompts:

- **Before building** — Create specs and feature docs
- **While building** — AI follows your rules automatically
- **After completing** — Archive specs, update docs

→ [View full workflow prompts](/workflow/)

---

## If AI Can't Fetch URLs

Some AI assistants can't access web content. Use this alternative:

```
Apply the AI-First Dev Kit methodology to this project.
I'll provide the reference content below.

First, analyze this project's tech stack and patterns.
Then create the structure based on what I paste.
```

Then paste the relevant sections from:
- [Methodology](/methodology/) — core concepts
- [Project Structure](/templates/project-structure/) — folder layout
- [AGENTS.md Template](/templates/agents-md/) — root context format
- [Cursor Rules](/templates/cursor-rules/) — rule file format

---

## Alternative: Manual Setup

If you prefer to set up manually:

### Create folders

```bash
mkdir -p .cursor/rules
mkdir -p docs/specs/_archive
mkdir -p docs/features
mkdir -p docs/decisions
```

### Create AGENTS.md

```bash
touch AGENTS.md
```

Copy the template from [AGENTS.md template](/templates/agents-md/) and customize.

### Create rule index

```bash
touch .cursor/rules/00-index.mdc
```

Copy from [Cursor Rules template](/templates/cursor-rules/).

### Create docs index

```bash
touch docs/INDEX.md docs/TASKS.md
```

---

## New vs Existing Projects

| Scenario | Guide |
|----------|-------|
| Starting fresh | [New Project Guide](/guides/new-project/) |
| Adding to existing code | [Existing Project Guide](/guides/existing-project/) |

The key difference: for existing projects, document what IS, not what should be. Your rules should capture existing patterns, not impose new ones.

---

## Next Steps

- Follow the [Development Workflow](/workflow/) for day-to-day prompts
- Read the [full methodology](/methodology/) to understand the three pillars
- Browse [templates](/templates/) to see all available files
- Check [guides](/guides/) for detailed walkthroughs
