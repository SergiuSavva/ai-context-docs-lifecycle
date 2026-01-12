# Required Structure

> **For AI Agents**: Every project using this kit MUST have this folder structure.

---

## Minimum Required Structure

```
project/
├── AGENTS.md                    # REQUIRED: Root AI context
│
├── .cursor/rules/               # REQUIRED: AI behavior rules
│   └── 00-index.mdc            # REQUIRED: Rule index
│
└── docs/
    ├── INDEX.md                # REQUIRED: Human navigation hub
    ├── TASKS.md                # REQUIRED: Progress tracking
    │
    ├── specs/                  # PRD-lite specifications
    │   ├── README.md           # Explains PRD-lite format + current phase
    │   ├── [phase-folder]/     # OPTIONAL: Group by phase/release
    │   └── _archive/           # Completed specs
    │
    ├── features/               # Feature documentation
    │   └── README.md           # Feature index
    │
    └── decisions/              # Architecture Decision Records
        └── README.md           # ADR index and template
```

### Specs Folder Organization

The `docs/specs/` folder supports multiple project types:

| Project Type | Structure |
|--------------|-----------|
| **New project (MVP)** | `specs/` with flat files or `specs/mvp/` subfolder |
| **Phased project** | `specs/phase-1/`, `specs/phase-2/`, etc. |
| **Release-based** | `specs/v1.0/`, `specs/v2.0/`, etc. |
| **Ongoing maintenance** | `specs/` with flat files, no subfolders |

The `README.md` inside `specs/` should document:
- Current project phase/version (if applicable)
- What's in scope NOW
- Spec naming convention

---

## Required Files Explained

### AGENTS.md (Root Level)

**Purpose**: Quick context for AI agents - read FIRST before any task.

**Must contain**:
- Quick start commands (install, dev, test)
- Tech stack summary
- File organization overview
- Links to detailed docs

**Location**: Project root (`/AGENTS.md`)

Use template: `../templates/AGENTS.md`
See example: `../examples/AGENTS.md`

---

### .cursor/rules/00-index.mdc

**Purpose**: Master index telling AI which rules to load and when.

**Must contain**:
- List of all rule files
- When each rule applies
- Loading priority by task type

**Location**: `/.cursor/rules/00-index.mdc`

Use template: `../templates/cursor-rules/00-index.mdc`
See example: `../examples/cursor-rules/00-index.mdc`

---

### docs/INDEX.md

**Purpose**: Navigation hub for human developers.

**Must contain**:
- Quick start instructions
- Documentation map
- Links to all major sections

**Location**: `/docs/INDEX.md`

---

### docs/TASKS.md

**Purpose**: Global progress tracking across all features.

**Must contain**:
- Feature status summary table
- Task lists by feature
- Progress percentages

**Location**: `/docs/TASKS.md`

Use template: `../templates/tasks.md`
See example: `../examples/tasks.md`

---

## Optional But Recommended

### Feature-Level AGENTS.md

For complex features, add an AGENTS.md inside the feature folder:

```
features/auth/
├── AGENTS.md           # Feature-specific AI context
├── components/
├── hooks/
└── utils/
```

Use template: `../templates/feature-AGENTS.md`
See example: `../examples/feature-AGENTS.md`

---

## Creating the Structure

### For AI Agents

When applying this kit to a project:

```
1. Check if AGENTS.md exists
   - If not: Create from ../templates/AGENTS.md
   
2. Check if .cursor/rules/ exists
   - If not: Create folder
   - Add 00-index.mdc from ../templates/cursor-rules/
   
3. Check if docs/ exists
   - If not: Create full structure
   - If partial: Add missing required files
   
4. Customize all files for the specific project
```

### Validation Checklist

Before completing setup, verify:

- [ ] `AGENTS.md` exists at root with project-specific content
- [ ] `.cursor/rules/00-index.mdc` exists with rule index
- [ ] `docs/INDEX.md` exists with navigation
- [ ] `docs/TASKS.md` exists (can be empty initially)
- [ ] `docs/specs/` folder exists for specifications
- [ ] `docs/decisions/` folder exists for ADRs
