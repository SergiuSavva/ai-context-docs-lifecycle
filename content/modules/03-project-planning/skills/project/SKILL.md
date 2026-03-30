---
name: project
description: Project-level planning — roadmap, backlog, task tracking, and PRD. Use /project <phase> for specific actions. Use when managing multiple features, prioritizing work, tracking project progress, or documenting product vision.
---

# Project Planning

> **References:** Templates → `.agents/skills/project/templates/`

## Phase Routing

| Command | Purpose |
|---------|---------|
| `/project discovery` | PRD, vision, goals, target users |
| `/project plan` | Roadmap, backlog, prioritization |
| `/project status` | What's done, what's next across all features |

---

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

## Phase: discovery

> Define what the project is, who it's for, and what success looks like.

Copy `PROJECT-PRD.md` from templates to project root. Fill in:

| Section | Content |
|---------|---------|
| Vision | What does this product do and why |
| Target Users | Who uses it and what they need |
| Goals | Measurable success criteria |
| Non-Goals | What this product is NOT |

The PRD is **evergreen** — keep it updated as the product evolves.

### PRD Quality Rules

| Good | Bad |
|------|-----|
| Vision states a specific user problem | "Make the app better" |
| Goals are measurable ("reduce onboarding to <5 min") | "Improve user experience" |
| Target users are named personas with needs | "Users" with no specifics |
| Non-Goals explicitly exclude tempting scope | No Non-Goals section |

**Confirmation gate**: Present the filled PRD to the user for review before proceeding to planning.

| Aspect | Feature Spec | Project PRD |
|--------|--------------|-------------|
| **Scope** | Single feature | Entire product |
| **Location** | `specs/<feature>/` | `PROJECT-PRD.md` |
| **Lifecycle** | Ephemeral (delete after) | Evergreen (keep updated) |

---

## Phase: plan

> Prioritize features and organize into phases/releases.

### Initializing Planning Documents

Copy templates from `.agents/skills/project/templates/` to the project root:

| Template | Destination | When |
|----------|-------------|------|
| `BACKLOG.md` | `BACKLOG.md` | Managing multiple features |
| `ROADMAP.md` | `ROADMAP.md` | Planning phases or releases |
| `TASKS.md` | `TASKS.md` | Tracking global progress |
| `PROJECT-PRD.md` | `PROJECT-PRD.md` | Optional — for project vision |

Start with `BACKLOG.md` + `ROADMAP.md`. Add `PROJECT-PRD.md` only if you need to document product vision.

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

---

## Phase: status

> Report current state across all features.

### What to Inspect

Read these files in order:

1. **`BACKLOG.md`** — list all features and their states
2. **`TASKS.md`** — get global progress percentages
3. **`ROADMAP.md`** — check current phase completion
4. **Each active `specs/*/tasks.md`** — calculate per-feature progress: `(completed + skipped) / total * 100`

### Report Format

```
**Project Status**:
- Active features: [count]
- In Progress: [list with % complete from tasks.md]
- Ready (not started): [list from BACKLOG.md]
- Blocked: [list with reasons from tasks.md [B] markers]
- Current phase: [from ROADMAP.md]

**Recommended Next Action**: [specific instruction — e.g., "Start feature X (highest priority Ready item)" or "Resolve blocker on feature Y"]
```

---

## Workflow

### Adding Features

1. Add to `BACKLOG.md` as "Idea"
2. When ready to spec, create `specs/<feature>/` (use `load skill feature`)
3. Update `BACKLOG.md` status to "Specified"

### Building Features

1. Update `BACKLOG.md` status to "In Progress"
2. Use `load skill feature` for the full lifecycle
3. Update `TASKS.md` progress

### Completing Features

1. Update `BACKLOG.md` status to "Complete"
2. Update `TASKS.md` with 100%
3. Update `ROADMAP.md` if phase complete
4. Delete `specs/<feature>/` folder

---

## Anti-Patterns

| Anti-Pattern | Why It Fails | Do Instead |
|--------------|-------------|------------|
| Planning multiple milestones in detail | Future milestones change; wasted planning | Plan current milestone in detail, keep future ones as goals |
| Adding process features (retrospectives, standups, ceremonies) | This is a solo/small-team tool, not enterprise PM | Focus on product features, not process artifacts |
| Duplicating requirements across phases | Creates ambiguity about where work lives | Each requirement maps to exactly one phase |
| Vague roadmap goals ("improve performance") | Can't verify completion, can't plan tasks | Observable outcomes: "Page load under 2s on 3G" |
| Keeping completed specs around | Stale docs are worse than no docs | Delete spec folder after feature ships |

---

## When NOT to Use

- Solo project with clear scope — `load skill feature` is sufficient
- Single feature at a time — just use `load skill feature`
- Using external tools (Jira, Linear, GitHub Projects) for planning
- Don't need formal planning

---

## Quick Checklist

- [ ] `BACKLOG.md` exists with prioritized feature list
- [ ] `ROADMAP.md` groups features into phases/releases
- [ ] Feature states are current (Idea → Specified → Ready → In Progress → Complete)
- [ ] `TASKS.md` reflects actual progress across features
- [ ] Completed features have their spec folders deleted
- [ ] Blocked items have documented blockers with owners

## Related

- load skill `feature` — for building individual features
- load skill `acdl` — for ACDL setup and AGENTS.md
- load skill `docs` — for reference documentation
