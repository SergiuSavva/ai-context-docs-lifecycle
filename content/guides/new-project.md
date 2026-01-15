<!-- site:
title: New Project Guide
description: Set up AI Context Docs Lifecycle for a new project
-->

# Applying AI Context Docs Lifecycle to a New Project

> **For AI Agents**: Follow these steps when setting up the methodology for a brand new project.

---

## Overview

Setting up a new project with the AI Context Docs Lifecycle methodology involves:

1. Creating the required folder structure
2. Setting up AGENTS.md
3. Creating initial cursor rules
4. Setting up documentation structure
5. Establishing the workflow

---

## Step 1: Create Required Structure

Based on `rules/00-structure.md`, create this structure:

```bash
# Create documentation folders
mkdir -p docs/specs/_archive
mkdir -p docs/features
mkdir -p docs/decisions

# Create cursor rules folder
mkdir -p .cursor/rules
```

---

## Step 2: Create AGENTS.md

Create `/AGENTS.md` at the project root.

**Use template:** `../templates/AGENTS.md`
**See example:** `../examples/AGENTS.md`

**Customize with:**
- Actual project name
- Real quick start commands
- Actual tech stack
- Real file organization

```markdown
# [Project Name] - AI Agent Instructions

## Quick Start
npm install
npm run dev
npm test

## Project Overview
[What this project does]

## Tech Stack
- Language: [X]
- Framework: [X]
- Database: [X]

## File Organization
[Actual structure]

## Key Patterns
[Important conventions]

## Need Help?
- Architecture: .cursor/rules/project-architecture.mdc
- Patterns: .cursor/rules/coding-patterns.mdc
```

---

## Step 3: Create Cursor Rules

### 3.1 Create 00-index.mdc (REQUIRED)

Create `/.cursor/rules/00-index.mdc`.

**Use template:** `../templates/cursor-rules/00-index.mdc`
**See example:** `../examples/cursor-rules/00-index.mdc`

This file MUST exist and list all other rules.

### 3.2 Create Project-Specific Rules (Optional)

Based on project needs, create additional rules:

| If project has... | Use template... | See example... |
|-------------------|-----------------|----------------|
| Specific architecture | `templates/cursor-rules/project-architecture.mdc` | `examples/cursor-rules/project-architecture.mdc` |
| Code conventions | `templates/cursor-rules/coding-patterns.mdc` | `examples/cursor-rules/coding-patterns.mdc` |
| Data fetching | `templates/cursor-rules/state-management.mdc` | `examples/cursor-rules/state-management.mdc` |
| Testing requirements | `templates/cursor-rules/testing-strategy.mdc` | `examples/cursor-rules/testing-strategy.mdc` |

---

## Step 4: Create Documentation Structure

### 4.1 Create docs/INDEX.md

```markdown
# [Project Name] Documentation

## Quick Start
[Installation and dev commands]

## Documentation Map
- docs/TASKS.md - Progress tracking
- docs/features/ - Feature documentation
- docs/specs/ - Specifications
- docs/decisions/ - Architecture decisions

## For AI Agents
- AGENTS.md - Quick context
- .cursor/rules/ - Detailed patterns
```

### 4.2 Create docs/TASKS.md

```markdown
# [Project Name] - Task Index

## Quick Summary
| Feature | Status | Tasks | Done | Progress |
|---------|--------|-------|------|----------|
| [Initial setup] | In Progress | 5 | 0 | 0% |

## Status Legend
| Symbol | Meaning |
|--------|---------|
| ⏳ | Not Started |
| 🔄 | In Progress |
| ✅ | Complete |
```

### 4.3 Create docs/specs/README.md

```markdown
# Specifications

This folder contains PRD-lite specifications for features.

## Current Phase
[MVP | Phase 2 | v1.0 | Ongoing - describe current project phase]

## Organization
- Flat structure: `<feature>.md` files directly in this folder
- OR phased: `phase-1/`, `phase-2/` subfolders
- OR release-based: `v1.0/`, `v2.0/` subfolders
- Completed specs: `_archive/`

## Format
Use template: ../templates/prd-lite.md
See example: ../examples/prd-lite.md

## Active Specs
| Spec | Feature | Status |
|------|---------|--------|
| - | - | - |
```

### 4.4 Create docs/decisions/README.md

```markdown
# Architecture Decision Records

## ADRs
| ADR | Decision | Status |
|-----|----------|--------|
| - | - | - |

## Template
Use template: ../templates/adr.md
See example: ../examples/adr.md
```

---

## Step 5: Verify Setup

Run this checklist:

- [ ] `AGENTS.md` exists at root with project-specific content
- [ ] `.cursor/rules/00-index.mdc` exists
- [ ] `docs/INDEX.md` exists
- [ ] `docs/TASKS.md` exists
- [ ] `docs/specs/README.md` exists
- [ ] `docs/decisions/README.md` exists

---

## Step 6: Establish Workflow

From now on, follow `rules/01-workflow.md`:

1. **Before building a feature:**
   - Write PRD-lite spec in `docs/specs/<feature>.md` (or `docs/specs/<phase>/<feature>.md`)
   - Create feature docs in `docs/features/<feature>/`
   - Add tasks to `docs/TASKS.md`

2. **While building:**
   - Follow `.cursor/rules/` patterns
   - Update docs as code is written
   - Check off completed tasks

3. **After completing:**
   - Update feature status
   - Archive specs if needed
   - Add new patterns to rules

---

## Final Structure

After setup, project should look like:

```
project/
├── AGENTS.md                    # ✅ Root AI context
├── .cursor/
│   └── rules/
│       └── 00-index.mdc        # ✅ Rule index
├── docs/
│   ├── INDEX.md                # ✅ Navigation
│   ├── TASKS.md                # ✅ Progress
│   ├── specs/
│   │   ├── README.md           # ✅ Specs index + phase info
│   │   └── _archive/           # ✅ Completed specs
│   ├── features/
│   │   └── README.md           # ✅ Feature index
│   └── decisions/
│       └── README.md           # ✅ ADR index
└── [project source code]
```

---

## Next Steps

1. Start your first feature using the workflow
2. Create ADRs for major technology decisions
3. Add project-specific rules as patterns emerge
4. Keep AGENTS.md updated as project evolves
