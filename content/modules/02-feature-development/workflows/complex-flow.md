# Complex Flow (Research Required)

> **For complex features** - includes Research phase with all optional docs.

---

## When to Use

| Trigger | Example |
|---------|---------|
| New system | "Implement authentication system" |
| External API | "Integrate Stripe payments" |
| Architecture change | "Migrate from REST to GraphQL" |
| Research needed | "Evaluate caching solutions" |
| Multiple approaches | "Choose between SSR and CSR" |

**Rule**: If you need to evaluate options before building, use Complex Flow.

---

## Four Phases

```
Research (required) → Plan (required) → Implement (required) → Verify (required)
```

All phases include validation checkpoints with user.

---

## Phase 1: Research

Explore unknowns before committing to an approach.

### Create research.md

```
specs/[feature-name]/research.md
```

Must include:
- Problem statement
- Options evaluated (2+ alternatives)
- Pros/cons for each
- Recommendation with rationale

### AI Instructions

```
1. Document at least 2 alternatives
2. List pros/cons for each
3. Include relevant links/resources
4. Create diagrams if helpful
5. Make recommendation with rationale
6. VALIDATE with user before proceeding
```

**Do not proceed to Plan until research is approved.**

---

## Phase 2: Plan

Create comprehensive documentation.

### Required Docs

| Doc | Purpose |
|-----|---------|
| `spec.md` | What to build, acceptance criteria |
| `tasks.md` | Implementation checklist |

### Optional Docs (Recommended for Complex)

| Doc | Purpose | Add When |
|-----|---------|----------|
| `design.md` | Architecture, APIs, data models | System design needed |
| `plan.md` | Sequence, dependencies, risks | Complex dependencies |
| `user-stories.md` | Test scenarios (Given/When/Then) | User-facing feature |

### AI Instructions

```
1. Write clear problem statement
2. Define measurable acceptance criteria
3. Set explicit scope boundaries (In/Out)
4. Identify risks and mitigations
5. Break down into phased tasks
6. VALIDATE plan with user before implementing
```

---

## Phase 3: Implement

Execute with structured task tracking.

### AI Instructions

```
1. ONE task [~] at a time (per wave, if using waves)
2. Update tasks.md after EACH task
3. Work in dependency order (see plan.md)
4. Signal completion at milestones
5. Request human review at checkpoints
```

**Parallel execution (opt-in)**: When tasks are grouped into waves in `tasks.md`, independent tasks within a wave can run in parallel. All tasks in Wave N must complete before Wave N+1 starts.

### Context Loading Order

```
1. AGENTS.md                    → Project context
2. specs/[feature]/research.md  → Research notes
3. specs/[feature]/spec.md      → Requirements
4. specs/[feature]/plan.md      → Dependencies
5. specs/[feature]/tasks.md     → Current status
6. Relevant skills              → Coding patterns (on-demand)
7. @docs/ references            → System knowledge (on-demand)
```

---

## Phase 4: Verify (Definition of Done)

When all tasks are `[x]` or `[S]`, create the verification checklist. This checklist **is** the Definition of Done — a single artifact that gates closeout.

### Create verify-checklist.md

```
specs/[feature-name]/verify-checklist.md
```

The checklist covers:

1. **Task Completion** — all tasks `[x]`/`[S]`, progress = 100%
2. **Acceptance Criteria** — each AC verified with concrete evidence
3. **Scope Check** — in-scope delivered, no out-of-scope creep
4. **Quality** — no linter errors, tests pass
5. **Knowledge Persistence** — affected reference docs updated, ADR created if needed
6. **Human Approval** — user signs off

Present the completed checklist to the user. Do not proceed to closeout until all checks pass and the user approves.

```
Verification complete.

**Acceptance Criteria**: All pass / Issues found
**Scope**: Clean / Creep detected
**Key Decisions**: [Decision 1]: [Brief rationale]
**Doc Freshness**: Up to date / Updates needed

**Next steps**: Please review. After approval, I will close out.
```

---

## After Approval (Closeout)

### 1. Create ADR

```
docs/decisions/NNN-[decision-name].md
```

ADR captures:
- Why this approach was chosen
- What alternatives were rejected
- Trade-offs accepted

### 2. Update AGENTS.md

Add new patterns, update tech stack if needed.

### 3. Delete Spec Folder

```
specs/[feature-name]/ → deleted
```

Knowledge now lives in:
- `docs/decisions/` (permanent)
- `AGENTS.md` (evergreen)

---

## Git Workflow (Recommended)

These are recommendations, not mandates:

- **Branch per feature**: Create `feat/<spec-name>` or `fix/<spec-name>` from your main branch
- **Commit per task or wave**: Commit after each completed task or wave, not one giant commit at the end
- **Meaningful messages**: Use `type(scope): description` format (e.g., `feat(auth): add JWT verification`)
- **Spec in branch**: Include `specs/` folder in the branch; remove during closeout
- **On closeout**: Squash-merge or merge with history — your choice

---

## File Structure

```
specs/
└── [feature-name]/
    ├── research.md          # Required for complex
    ├── spec.md              # Required
    ├── tasks.md             # Required
    ├── verify-checklist.md  # Created during Verify phase
    ├── design.md            # Recommended
    ├── plan.md              # Recommended
    └── user-stories.md      # Recommended

docs/decisions/
└── NNN-[decision].md        # Created after approval
```

---

## Checkpoints Summary

| After | Validate |
|-------|----------|
| Research | User approves approach |
| Plan | User approves spec |
| Implement | Tasks complete, proceed to verify |
| Verify | User reviews checklist and approves for merge |
