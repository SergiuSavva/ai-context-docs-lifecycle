# Module 3: Feature Development

> **Structured workflows for building features** - from bug fixes to complex systems.

---

## What This Module Does

Provides three workflow tracks for AI agents to follow when building features, ensuring consistent specs, task tracking, and documentation.

## When to Use

- Building any feature (small or large)
- Want structured task tracking
- Need clear handoffs between AI and human review
- Want decisions documented for future reference

## What You Get

```
your-project/
├── docs/
│   ├── specs/                    # Active feature specs (ephemeral)
│   │   ├── <feature>/
│   │   │   ├── feature-spec.md  # Requirements
│   │   │   ├── tasks.md         # Task checklist
│   │   │   ├── research.md      # Research notes (complex flow)
│   │   │   ├── design.md        # Architecture/API design (complex flow)
│   │   │   └── user-stories.md  # Acceptance criteria (complex flow)
│   │   └── _archive/            # Completed specs
│   │
│   └── decisions/               # ADRs (permanent)
│       └── NNN-<decision>.md
│
└── .cursor/rules/
    └── feature-workflow.mdc     # AI workflow instructions
```

---

## Three Workflow Tracks

Choose based on what you're building:

| Trigger | Flow | Templates Needed |
|---------|------|------------------|
| Bug fix, typo, config change, single-file | **Quick** | None |
| New component, endpoint, < 5 files | **Standard** | feature-spec, tasks |
| New system, API integration, > 5 files | **Complex** | All templates |

### Decision Tree

```
Does this require research or evaluating alternatives?
├─ YES → Complex Flow
└─ NO → Will this change more than 5 files?
         ├─ YES → Complex Flow
         └─ NO → Is this a bug fix, typo, or config change?
                  ├─ YES → Quick Flow
                  └─ NO → Standard Flow
```

---

## Quick Flow

**For**: Bug fixes, typos, config changes, single-file edits

**Process**:
1. Understand the issue
2. Fix code
3. Commit with descriptive message
4. Done

**No templates needed** - just good commit messages.

See: [`workflows/quick-flow.md`](./workflows/quick-flow.md)

---

## Standard Flow

**For**: New components, endpoints, UI enhancements (< 5 files)

**Process**:
1. Create `feature-spec.md` (problem + acceptance criteria)
2. Create `tasks.md` with checklist
3. Implement with task tracking
4. Update docs
5. Archive or delete spec

**Templates**:
- [`templates/feature-spec.md`](./templates/feature-spec.md)
- [`templates/tasks.md`](./templates/tasks.md)

See: [`workflows/standard-flow.md`](./workflows/standard-flow.md)

---

## Complex Flow

**For**: New systems, API integrations, architecture changes (> 5 files)

**Process**:
1. Research phase (gather options, create diagrams)
2. Write detailed spec + user stories
3. Create task breakdown
4. Implement with progress tracking
5. Review iterations
6. Create ADR for key decisions
7. Update AGENTS.md
8. Archive spec

**Templates**:
- [`templates/feature-spec.md`](./templates/feature-spec.md)
- [`templates/research.md`](./templates/research.md)
- [`templates/design.md`](./templates/design.md) - Architecture/API design
- [`templates/user-stories.md`](./templates/user-stories.md)
- [`templates/tasks.md`](./templates/tasks.md)
- [`templates/adr.md`](./templates/adr.md)

See: [`workflows/complex-flow.md`](./workflows/complex-flow.md)

---

## Task Markers

Track progress with markdown checkboxes:

| Marker | Status | Meaning |
|--------|--------|---------|
| `[ ]` | Pending | Not started |
| `[~]` | In Progress | Currently working (only ONE at a time) |
| `[x]` | Completed | Done |
| `[B]` | Blocked | Waiting on something (include reason) |
| `[S]` | Skipped | Descoped (include reason) |

**Progress calculation**: `(completed + skipped) / total * 100`

---

## Definition of Done

### Quick Flow

- [ ] Code works
- [ ] No linter errors
- [ ] Commit message describes change

### Standard Flow

**Auto-verifiable:**
- [ ] All tasks completed or skipped
- [ ] No linter errors

**Manual verification:**
- [ ] Acceptance criteria met
- [ ] Feature README updated (if applicable)

### Complex Flow

**Auto-verifiable:**
- [ ] All tasks completed or skipped
- [ ] No blocked tasks remaining

**Manual verification:**
- [ ] All acceptance criteria verified
- [ ] Tests passing
- [ ] ADR created for key decisions
- [ ] AGENTS.md updated
- [ ] Spec archived

---

## Examples

- [`examples/simple-todo/`](./examples/simple-todo/) - Standard flow walkthrough
- [`examples/complex-auth/`](./examples/complex-auth/) - Complex flow walkthrough

---

## Cursor Rule

Copy [`rules/feature-workflow.mdc`](./rules/feature-workflow.mdc) to your project's `.cursor/rules/` folder to enable AI workflow guidance.

---

## Prerequisites

- [Module 1: Quick Start](../01-quick-start/) - AGENTS.md for project context

## What's Next?

- [Module 4: Reference Docs](../04-reference-docs/) - Documentation structure and freshness rules
