# Module 5: Project Planning

> **Optional module** for managing multiple features and project-level planning.

---

## The Problem

When you have multiple features to build:
- "What should I build next?" - No clear priorities
- "How far along is the project?" - Progress scattered across feature specs
- "What's the vision?" - No single source of truth

**The solution**: Project-level documents that AI agents can read to understand priorities and progress.

**Note**: If you use Jira, Linear, or GitHub Projects, you may not need this module. Its value is keeping planning docs in-repo where AI can read them.

---

## What This Module Does

Provides templates for tracking multiple features, prioritizing work, and maintaining a project-level vision. This is the only module where a project-level PRD (Product Requirements Document) lives.

## When to Use

- Managing multiple features/specs
- Need to prioritize what to build next
- Want project-level vision documented
- Working with a team that needs shared roadmap

## What You Get

```
your-project/
└── docs/
    ├── PROJECT-PRD.md      # Project vision (optional)
    ├── BACKLOG.md          # Feature prioritization
    ├── ROADMAP.md          # Phase planning
    └── TASKS.md            # Global progress tracking
```

---

## Templates

### PROJECT-PRD.md (Optional)

**What**: High-level product vision for the entire project
**When**: When you need to document overall goals, target users, success metrics
**Lifecycle**: Evergreen - keep updated as vision evolves

This is different from feature specs:
- Feature Spec = What to build for ONE feature
- Project PRD = Vision for the ENTIRE product

See: [`templates/PROJECT-PRD.md`](./templates/PROJECT-PRD.md)

---

### BACKLOG.md

**What**: Prioritized list of features/specs to build
**When**: When managing multiple features
**Lifecycle**: Evergreen - update as priorities change

Features move through states:
```
Idea → Specified → Ready → In Progress → Complete
```

See: [`templates/BACKLOG.md`](./templates/BACKLOG.md)

---

### ROADMAP.md

**What**: Phase-based or time-based planning
**When**: When features are grouped into releases or phases
**Lifecycle**: Evergreen - update as plans change

Organization options:
- Phase-based: MVP → Phase 2 → Phase 3
- Release-based: v1.0 → v1.1 → v2.0
- Quarter-based: Q1 → Q2 → Q3

See: [`templates/ROADMAP.md`](./templates/ROADMAP.md)

---

### TASKS.md

**What**: Global progress tracking across all features
**When**: Want high-level view of project progress
**Lifecycle**: Evergreen - update as features complete

See: [`templates/TASKS.md`](./templates/TASKS.md)

---

## Feature Spec vs Project PRD

| Aspect | Feature Spec | Project PRD |
|--------|--------------|-------------|
| **Scope** | Single feature | Entire product |
| **Location** | `specs/<feature>/` | `docs/PROJECT-PRD.md` |
| **Lifecycle** | Ephemeral (delete after) | Evergreen (keep updated) |
| **Content** | Problem, scope, tasks | Vision, users, metrics |
| **When Created** | Before each feature | Once per project |

---

## Workflow

### Starting a Project

1. Create PROJECT-PRD.md (optional, for vision)
2. Create ROADMAP.md (phases/releases)
3. Create BACKLOG.md (feature list)

### Adding Features

1. Add to BACKLOG.md as "Idea"
2. When ready to spec, create `specs/<feature>/`
3. Update BACKLOG.md status to "Specified"

### Building Features

1. Update BACKLOG.md status to "In Progress"
2. Use Module 3 workflows (Quick/Standard/Complex)
3. Update TASKS.md progress

### Completing Features

1. Update BACKLOG.md status to "Complete"
2. Update TASKS.md with 100%
3. Update ROADMAP.md if phase complete

---

## Prerequisites

- [Module 1: Quick Start](../01-quick-start/) - AGENTS.md
- [Module 3: Feature Development](../03-feature-development/) - For building features

---

## When NOT to Use

Skip this module if:
- Solo project with clear scope
- Single feature at a time
- Don't need formal planning
- Prefer lightweight approach

Module 3 (Feature Development) is sufficient for most projects.
