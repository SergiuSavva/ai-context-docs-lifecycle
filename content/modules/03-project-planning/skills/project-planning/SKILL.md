---
name: project-planning
description: Project-level planning — roadmap, backlog, task tracking, and PRD. Use when managing multiple features, prioritizing work, tracking project progress, or documenting product vision.
---

# Project Planning

> **References:** Templates → `.agents/skills/project-planning/templates/`

## What This Skill Does

Provides templates and workflow for managing multiple features at the project level. Covers prioritization, phase planning, progress tracking, and product vision.

**Note**: If you use Jira, Linear, or GitHub Projects, you may not need this. Its value is keeping planning docs in-repo where AI agents can read them.

---

## When to Use

- Managing multiple features or specs
- Need to prioritize what to build next
- Want project-level vision documented
- Working with a team that needs a shared roadmap

---

## Initializing Planning Documents

Copy templates from `.agents/skills/project-planning/templates/` to the project root:

| Template | Destination | When |
|----------|-------------|------|
| `BACKLOG.md` | `BACKLOG.md` | Managing multiple features |
| `ROADMAP.md` | `ROADMAP.md` | Planning phases or releases |
| `TASKS.md` | `TASKS.md` | Tracking global progress |
| `PROJECT-PRD.md` | `PROJECT-PRD.md` | Optional — for project vision |

Start with `BACKLOG.md` + `ROADMAP.md`. Add `PROJECT-PRD.md` only if you need to document product vision.

---

## Four Documents

### BACKLOG.md — Feature Priorities

Prioritized list of features with states:

```
Idea → Specified → Ready → In Progress → Complete
```

| State | Meaning |
|-------|---------|
| **Idea** | Captured but not yet specified |
| **Specified** | Has a `specs/[feature]/spec.md` |
| **Ready** | Spec approved, tasks created, ready to build |
| **In Progress** | Currently being implemented |
| **Complete** | Shipped, spec folder deleted |

### ROADMAP.md — Phase Planning

Group features into phases, releases, or quarters:

- Phase-based: MVP → Phase 2 → Phase 3
- Release-based: v1.0 → v1.1 → v2.0
- Quarter-based: Q1 → Q2 → Q3

### TASKS.md — Global Progress

High-level progress view across all active features. Shows completion percentage per feature.

### PROJECT-PRD.md — Product Vision (Optional)

Project-level vision: goals, target users, success metrics. Different from feature specs:

| Aspect | Feature Spec | Project PRD |
|--------|--------------|-------------|
| **Scope** | Single feature | Entire product |
| **Location** | `specs/<feature>/` | `PROJECT-PRD.md` |
| **Lifecycle** | Ephemeral (delete after) | Evergreen (keep updated) |

---

## Workflow

### Starting a Project

1. Copy `BACKLOG.md` from templates to project root
2. Copy `ROADMAP.md` from templates to project root
3. Optionally copy `PROJECT-PRD.md` for product vision
4. Fill in initial features and phases

### Adding Features

1. Add to `BACKLOG.md` as "Idea"
2. When ready to spec, create `specs/<feature>/` (use `load skill feature-workflow`)
3. Update `BACKLOG.md` status to "Specified"

### Building Features

1. Update `BACKLOG.md` status to "In Progress"
2. Use feature workflow (`load skill feature-workflow`)
3. Update `TASKS.md` progress

### Completing Features

1. Update `BACKLOG.md` status to "Complete"
2. Update `TASKS.md` with 100%
3. Update `ROADMAP.md` if phase complete
4. Delete `specs/<feature>/` folder

---

## When NOT to Use

- Solo project with clear scope — Module 1 + feature workflow is sufficient
- Single feature at a time — just use `load skill feature-workflow`
- Using external tools (Jira, Linear, GitHub Projects) for planning
- Don't need formal planning

---

## Quick Checklist

- [ ] `BACKLOG.md` exists with prioritized feature list
- [ ] `ROADMAP.md` groups features into phases/releases
- [ ] Feature states are current (Idea → Specified → Ready → In Progress → Complete)
- [ ] `TASKS.md` reflects actual progress across features
- [ ] Completed features have their spec folders deleted

## Related Docs

- load skill `feature-workflow`
- load skill `spec-writing`
