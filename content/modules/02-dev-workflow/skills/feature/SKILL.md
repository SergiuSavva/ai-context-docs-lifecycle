---
name: feature
description: Feature lifecycle — spec, research, design, tasks, build, verify, closeout with task tracking and validation checkpoints. Use /feature <phase> to jump to a specific phase. Also handles project state inspection and "what should I do next?" guidance.
---

# Feature Workflow

## Phase Routing

| Command | Phase | Purpose |
|---------|-------|---------|
| `/feature spec` | [spec](#phase-spec) | Define problem, acceptance criteria, scope |
| `/feature research` | [research](#phase-research) | Investigate unknowns, evaluate options |
| `/feature design` | [design](#phase-design) | Architecture decisions, ADRs |
| `/feature tasks` | [tasks](#phase-tasks) | Break spec into implementation tasks |
| `/feature build` | [build](#phase-build) | Implement task by task |
| `/feature verify` | [verify](#phase-verify) | Validate against acceptance criteria |
| `/feature closeout` | [closeout](#phase-closeout) | Update docs, archive spec |

**Flow**: spec → research (optional) → design (optional) → tasks → **[approval gate]** → build → verify → closeout

Each phase ends with a **user validation checkpoint** before proceeding.

---

## Project State Inspection

When resuming work, onboarding, or asked "what should I do next?", inspect state in this order:

```
1. Does AGENTS.md exist?
   ├─ NO  → Bootstrap it (load skill `acdl`)
   └─ YES → Continue

2. Does specs/ have active feature folders?
   ├─ NO  → Start a new feature (see Decision Tree) or Quick Flow for bug fixes
   └─ YES → Pick most recent, continue

3. Does the active spec have spec.md + tasks.md?
   ├─ Missing spec.md  → /feature spec
   ├─ Missing tasks.md → /feature tasks
   └─ Both exist → Check task progress

4. Task progress:
   ├─ All [x]/[S]     → /feature verify
   ├─ Any [B]         → Resolve blockers or mark [S] with justification
   ├─ Any [~]         → Continue that in-progress task
   └─ Otherwise       → Mark next pending task [~] and begin
```

**Report format:**

```
**Project State**:
- AGENTS.md: present / missing
- Active specs: [list or "none"]
- Current feature: [name] — Phase: spec / research / design / tasks / build / verify
- Implementation phase: Phase N of M ({{phase name}})
- Task progress: X/Y (Z%)
- Blocked: [count] tasks

**Recommended Next Action**: [specific instruction]
```

### Recovery Scenarios

| Situation | Action |
|-----------|--------|
| Stale spec (code changed, spec not updated) | Update spec.md or delete if feature is done |
| Tasks 100% but no verification | Create verify-checklist.md before closeout |
| Spec folder exists after feature shipped | Delete spec folder, check if ADR is needed |
| Multiple active specs | Focus on one; list all and ask user which to continue |

---

## Decision Tree

```
Is this a bug fix?
├─ YES → Quick Flow: Find → Fix → Commit → Done (no docs)
└─ NO → /feature spec → Create specs/[feature-name]/spec.md

    Do I need to evaluate options?
    ├─ YES → /feature research → Add research.md
    └─ NO → Continue

    Do I need architecture decisions?
    ├─ YES → /feature design → Add design.md
    └─ NO → Continue

    /feature tasks → Create tasks.md
    Validate with user → /feature build
```

---

## Phase: spec

> Define what to build: problem, solution, acceptance criteria, scope.

### Spec Structure

Every spec lives in `specs/[feature-name]/` and requires two files:

| File | Purpose |
|------|---------|
| `spec.md` | What to build — problem, solution, acceptance criteria |
| `tasks.md` | How to build it — phased checklist with progress tracking |

Optional files added as needed: `research.md`, `design.md`, `plan.md`, `user-stories.md`.

### Required Sections in spec.md

| Section | Content |
|---------|---------|
| **Problem** | 1-2 sentences: what's broken or missing, why it matters now |
| **Solution** | 1-2 sentences: how we'll solve it |
| **Acceptance Criteria** | Numbered AC-01, AC-02, etc. — testable conditions |
| **Scope** | In Scope / Out of Scope |
| **Technical Approach** | Brief approach (expand in design.md if complex) |
| **Implementation Phases** | Ordered phases: core → dependent, each with ACs and validation |
| **Dependencies** | External/internal dependencies |
| **Risks** | Risk + Mitigation table |
| **Status** | Draft / Approved / Implementing / Complete |

### Problem/Solution Framing

```markdown
<!-- Good: specific, explains "why now" -->
## Problem
Users must manually copy 5+ config files when starting a new service,
leading to inconsistent setups and missing environment variables.

## Solution
Add a `scaffold` command that generates service boilerplate from a
shared template with validated environment configuration.
```

**Rules**: State the problem before the solution. Include "why now" context. Keep each to 1-2 sentences.

### Acceptance Criteria

Format: `AC-XX: [Specific, testable condition]`

```markdown
<!-- Good: specific, verifiable -->
- [ ] AC-01: `scaffold` creates `docker-compose.yml` with all required service ports
- [ ] AC-02: `scaffold --validate` checks `.env` against `.env.example` and reports missing keys
- [ ] AC-03: Running `scaffold` in an existing directory warns and exits without mutation
```

**Rules**:
- Each AC must be independently verifiable
- Use specific values, file names, behaviors — not adjectives
- Number sequentially (AC-01, AC-02, ...)

### Scoping Discipline

```markdown
### In Scope
- `scaffold` command with template rendering
- Environment validation against `.env.example`

### Out of Scope
- Runtime service orchestration
- Cloud-specific deployment configuration
```

**Rules**: In Scope = what we ARE building. Out of Scope = what we are NOT building (prevents scope creep).

### Spec Anti-Patterns

| Anti-Pattern | Fix |
|--------------|-----|
| Vague criteria ("works correctly") | Use specific, testable conditions |
| Missing risks section | Always list at least one risk |
| No Out of Scope | Explicitly state what's excluded |
| Solution before problem | Always write Problem first |
| Monolithic spec (10+ ACs) | Split into multiple features |

### Templates

Copy from `.agents/skills/feature/templates/`:
- `spec.md` → `specs/<feature-name>/spec.md`

---

## Phase: research

> Investigate unknowns, evaluate options. Use only when multiple approaches are possible.

Create `specs/[feature-name]/research.md` using the template at `.agents/skills/feature/templates/research.md`.

### When to Research

- Multiple valid approaches exist
- External integration with unknown constraints
- Security/auth/data-model impact
- Non-trivial dependency ordering

### Research Structure

| Section | Content |
|---------|---------|
| Problem Statement | What we're trying to decide |
| Options Evaluated | A, B, C with Pros/Cons, Effort level |
| Comparison Matrix | Criteria vs options |
| Recommendation | Chosen option + rationale + trade-offs |
| Open Questions | Unanswered items |

Present findings and recommendation to user before proceeding.

---

## Phase: design

> Architecture decisions, API contracts, data models. Use when the feature has significant technical complexity.

Create `specs/[feature-name]/design.md` using the template at `.agents/skills/feature/templates/design.md`.

### Design Structure

| Section | Content |
|---------|---------|
| Architecture | System context diagram, component structure (Mermaid) |
| Data Model | Entities, relationships, schema |
| API Design | Endpoints, request/response examples |
| File Structure | Directory tree for new code |
| Error Handling | Error → user message → recovery |

### ADRs

When a feature introduces a meaningful technical choice, create an ADR using `load skill docs` → `/docs adr`.

### Optional: plan.md

For features with **complex dependencies, phased rollout, or significant risks**, create `specs/[feature-name]/plan.md` using the template at `.agents/skills/feature/templates/plan.md`.

| Section | Content |
|---------|---------|
| Implementation Phases | Phase goals, task groupings, dependencies |
| Dependency Graph | ASCII or Mermaid flowchart of phase ordering |
| Critical Path | Minimum sequence that blocks everything |
| Risk Areas | Risk, likelihood, impact, mitigation |
| Checkpoints | Criteria and timing for validation |
| Rollback Plan | Reversion steps if implementation fails |

Use when: multiple teams involved, phased rollout needed, or failure recovery must be planned.

### Optional: user-stories.md

For **user-facing features** where test scenarios help clarify behavior, create `specs/[feature-name]/user-stories.md` using the template at `.agents/skills/feature/templates/user-stories.md`.

| Section | Content |
|---------|---------|
| User Types | Personas table |
| User Stories | US-XX format: As a / I want to / So that |
| Scenarios | Given / When / Then for each story |
| AC Summary | Acceptance criteria mapped to stories |
| Edge Cases | Special situations to handle |

Use when: feature has multiple user types, behavior is best expressed as scenarios, or you need clear test case coverage.

---

## Phase: tasks

> Break spec into an implementation checklist with dependency-ordered phases.

Create `specs/[feature-name]/tasks.md` using the template at `.agents/skills/feature/templates/tasks.md`.

### From Spec to Tasks

| Spec Section | Drives |
|-------------|--------|
| Acceptance Criteria | What tasks must achieve |
| Implementation Phases | Phase ordering — core before dependent |
| Scope (In Scope) | Task coverage — nothing outside scope |
| Technical Approach | How tasks are structured |
| Dependencies | Task ordering and blockers |

### Phased Planning

Group tasks into **phases ordered by dependency** — core functionality first, then features that build on it:

1. **Maps to specific ACs** — every AC belongs to exactly one phase
2. **Has success criteria** — observable truths that must be TRUE when the phase is done (not "tests pass" but "user can log in and stay logged in across browser refresh")
3. **Must be validated before the next phase starts**

```
Phase 1 (core)  →  validate  →  Phase 2 (dependent)  →  validate  →  Phase 3 (integration)
```

### Task Numbering

Number tasks sequentially with the `T-XX` prefix under phase headings:

```markdown
- [ ] T-01: Set up database schema
- [ ] T-02: Create API route stubs
```

### Task Markers

| Marker | Status |
|--------|--------|
| `[ ]` | Pending |
| `[~]` | In Progress |
| `[x]` | Completed |
| `[B]` | Blocked (include reason) |
| `[S]` | Skipped (include reason) |

**Progress formula**: `(completed + skipped) / total * 100`

### Plan Verification Gate

Before marking any task `[~]`, verify:

1. **AC coverage** — every AC-XX maps to at least one task
2. **Task atomicity** — each task is a single deliverable
3. **Dependency ordering** — no task references output from a later task
4. **Success criteria** — every phase has observable truths, not just "tests pass"
5. **Scope alignment** — no task implements out-of-scope items

Present the AC → task mapping to the user for confirmation.

```
Plan Verification:
- [ ] AC coverage: [AC-01 → T-01, T-02] [AC-02 → T-03] ...
- [ ] Task atomicity: each task is a single deliverable
- [ ] Dependencies flow forward
- [ ] Every phase validation has a concrete check command
- [ ] No task exceeds spec scope
```

**Do not start implementation until all checks pass and user approves.**

---

## Phase: build

> Implement task by task with continuous progress tracking.

### Execution Rules

1. **One `[~]` at a time** (sequential) or **one `[~]` per wave** (parallel)
2. **Update tasks.md after EACH task** — track progress continuously
3. **Commit after each task or wave** — not one giant commit at the end
4. **Tests must pass** before marking a task `[x]` — tests are part of the task, not a follow-up
5. **Handle deviations** using the rules below — don't stop for everything

### Deviation Handling

During implementation, unexpected problems will surface. Use these rules to decide what to do without stopping for every issue:

| Situation | Action | Example |
|-----------|--------|---------|
| **Bug in current task** (wrong logic, type error, broken behavior) | Fix inline, note in tasks.md, continue | Null pointer, wrong query, broken validation |
| **Missing critical functionality** (security, error handling, validation) | Add it, note as deviation, continue | No input validation, missing auth check, no error handling |
| **Blocking issue** (can't proceed without fixing) | Fix it, note as deviation, continue | Missing dependency, broken import, wrong config |
| **Architectural change needed** (structural modification) | Mark `[B]`, describe the change and options, ask user | New database table, switching libraries, breaking API change |

**Scope boundary:** Only auto-fix issues directly caused by the current task's changes. Pre-existing problems in unrelated files are out of scope — note them in tasks.md under Notes, don't fix them.

**Fix attempt limit:** After 3 auto-fix attempts on a single issue, stop. Document the issue in tasks.md and move on or mark `[B]`.

### Sequential vs Parallel

- **Sequential (default)**: One `[~]` at a time across all tasks
- **Parallel (opt-in)**: Tasks grouped into waves (`### Wave N` headers). One `[~]` per wave. All tasks in Wave N must complete before Wave N+1 starts.
- **Safety check**: No two tasks in the same wave should modify the same file or shared state.

### Phase Validation Gates

Tasks are grouped into **dependency-ordered phases**. Between phases:

1. **Complete all tasks** in the current phase
2. **Run the phase validation** (defined in tasks.md — e.g., tests pass, output correct)
3. **Report results to user** and get confirmation before starting the next phase

If validation fails, fix issues within the current phase before moving on.

### Testing During Build

**Core principle: Test behavior, not implementation.** A good test breaks when the feature breaks, not when code is refactored.

| Use TDD | Skip TDD |
|---------|----------|
| Well-defined inputs/outputs (pure functions, APIs) | Exploratory / prototype code |
| Bug fixes (failing test = regression coverage) | UI layout and styling |
| Complex business logic with edge cases | Glue code and thin wrappers |
| Validation rules and algorithms | Configuration changes |

**Test quality checks**:
- Tests verify behavior through public API, not internal implementation
- Edge cases covered: empty, null, boundary, error
- Tests are independent (no shared mutable state)
- Test names describe behavior: `should [expected] when [condition]`

**Rule**: A task is not `[x]` complete unless its tests pass. Tests are part of the task, not a separate follow-up.

### Debugging During Build

When bugs are discovered during implementation:

```
Is the bug reproducible?
├─ YES → Gather → Reproduce → Hypothesize → Investigate → Fix → Verify
└─ NO  → Gather more symptoms (logs, error context)
```

**Key principles**:
- Fix the **root cause**, not the symptom
- Change **one thing at a time** during investigation
- Keep the fix **minimal** — resist refactoring surrounding code
- Write a regression test to prevent recurrence

### Subagent Delegation (Optional)

For large features (>8 tasks) or heavy context:

| Agent | When | Context |
|-------|------|---------|
| **Executor** | Per task or wave | spec.md + specific task(s) + AGENTS.md |
| **Verifier** | Phase validation gates | spec.md + tasks.md + verify-checklist.md + AGENTS.md |

**Protocol**: Pass file paths (let subagent read fresh). Subagent writes status in tasks.md. Orchestrator updates markers.

### Context Awareness

**Warning signs**: conversation >30 exchanges, agent forgetting earlier decisions, generic responses.

**Checkpoint protocol:**

1. After every 3 completed tasks, write a progress checkpoint comment in tasks.md:
   ```
   <!-- Checkpoint: T-06 complete, Phase 2 validated, starting Phase 3. Key decisions: chose jose over jsonwebtoken for ESM compat. -->
   ```
2. If any warning sign appears (forgetting decisions, generic output, >30 exchanges):
   - Write current state to tasks.md: what's done, what's next, any decisions made during this session
   - Tell user: "Context is getting heavy. Recommend a fresh session — tasks.md has full state for seamless resume."
   - If subagent delegation is available, offer to delegate remaining tasks
3. The tasks.md file is the source of truth that survives context resets. Keep it current.

---

## Phase: verify

> Confirm implementation matches spec. Create the Definition of Done.

When all tasks are `[x]` or `[S]`, create `specs/[feature-name]/verify-checklist.md` using the template at `.agents/skills/feature/templates/verify-checklist.md`.

### Verification Areas

1. **Task Completion** — all tasks `[x]`/`[S]`, progress = 100%
2. **Acceptance Criteria** — each AC verified with concrete evidence
3. **Scope Check** — in-scope delivered, no out-of-scope creep
4. **Quality** — no linter errors, tests pass
5. **Stub Detection** — scan all new/modified files for incomplete implementations (see checklist below)
6. **Knowledge Persistence** — affected reference docs updated, ADR created if needed
7. **Human Approval** — user signs off

```
Verification complete.

**Progress**: X/Y tasks (100%)
**Acceptance Criteria**: All pass / Issues found
**Stub Detection**: Clean / Issues found
**Doc Freshness**: Up to date / Updates needed
**Decision Record**: Created / Not needed

**Next steps**: Please review. After approval, I will close out.
```

Do not proceed to closeout until all checks pass and the user approves.

### Issue Triage

When the user reports problems during verification, infer severity from their description — don't ask "how severe is this?"

| User says | Severity | Action |
|-----------|----------|--------|
| "crashes", "error", "broken", "exception", "fails" | **Blocker** | Fix before closeout |
| "doesn't work", "wrong", "missing", "can't" | **Major** | Fix before closeout |
| "slow", "weird", "minor", "small issue" | **Minor** | Fix or document as known issue |
| "spacing", "color", "font", "alignment", "looks off" | **Cosmetic** | Fix or defer with note |

Default to **Major** if unclear. The user can correct if needed.

---

## Phase: closeout

> Update docs, archive spec, clean up.

After user approval:

1. **Update affected reference docs** — use `load skill docs` for conventions on what to update and how
2. **Create ADR** if a significant decision was made — use `load skill docs` → `/docs adr`
3. **Update AGENTS.md** if new patterns, commands, or boundaries emerged (load skill `acdl`)
4. **Update codebase patterns** if new patterns were established — use `load skill patterns`
5. **Delete `specs/[feature-name]/`** folder — specs are ephemeral

### Git Workflow

- **Branch naming**: `feat/<spec-name>` for features, `fix/<spec-name>` for bug fixes
- **Commit per task**: `type(scope): description` with `T-XX` in body
- **Types**: `feat`, `fix`, `test`, `refactor`, `chore`
- Every commit leaves the project in a working state

---

## Anti-Patterns

| Anti-Pattern | Why It Fails | Do Instead |
|--------------|-------------|------------|
| Horizontal phases (all DB, then all API, then all UI) | Nothing works until the last phase; can't verify incrementally | Vertical slices — each phase delivers a complete, testable capability |
| Vague acceptance criteria ("works correctly") | Can't verify, can't close out, endless scope | Specific, testable conditions with concrete values |
| Starting build before user approves the plan | Wasted work if the approach is wrong | Always get approval at the tasks → build gate |
| Batching all commits to the end | Can't bisect, can't revert individual tasks, unclear history | Commit per task with typed prefix (`feat`, `fix`, `test`) |
| Fixing unrelated code during a task | Scope creep, risk of breaking things outside the feature | Note pre-existing issues in tasks.md, don't fix them |
| Planning more detail than needed upfront | Wastes time on phases that may change | Plan the current phase in detail, keep future phases as goals |

---

## When NOT to Use

- **Bug fixes, typos, config changes** — Quick Flow: Find → Fix → Commit → Done
- **Pure exploration / brainstorming** — no structured workflow needed
- **Single-file changes** that don't need acceptance criteria
- **Setting up ACDL for the first time** — load skill `acdl` instead

---

## Quick Checklist

- [ ] spec.md exists with problem, solution, ACs, and implementation phases
- [ ] tasks.md exists with dependency-ordered phases and T-XX numbered tasks
- [ ] User validated spec before implementation started
- [ ] One `[~]` at a time (or per wave if parallel)
- [ ] tasks.md updated after each completed task
- [ ] Each phase validated before starting the next
- [ ] verify-checklist.md completed (this is the Definition of Done)
- [ ] User approved the verify-checklist before closeout
- [ ] Spec folder deleted after feature approved

## Templates

All templates in `.agents/skills/feature/templates/`:

| Template | When |
|----------|------|
| `spec.md` | Always (required) |
| `tasks.md` | Always (required) |
| `research.md` | Multiple approaches, unknowns |
| `design.md` | Complex architecture |
| `plan.md` | Complex dependencies, phased rollout |
| `user-stories.md` | User-facing features |
| `verify-checklist.md` | After all tasks complete |

## Related

- Spec files: @specs/[feature-name]/spec.md
- Task files: @specs/[feature-name]/tasks.md
- Decision records: @docs/decisions/
- load skill `acdl` — ACDL setup and AGENTS.md
- load skill `docs` — reference docs, ADRs, doc quality
- load skill `patterns` — codebase patterns to follow during build
- load skill `project` — multi-feature planning
