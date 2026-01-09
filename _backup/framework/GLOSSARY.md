# Framework Glossary

> **Purpose**: Define the terminology used in this Docs-as-Code framework.  
> **Audience**: Humans and AI agents adopting this methodology.  
> **Source of truth**: [README.md](README.md) — this file only defines terms.

---

## The Four Pillars

### Spec (Specification)

**What it is**: A document that defines *what* to build *before* you build it.

**Lifecycle**: Ephemeral — Draft → In Progress → Done → Archived

**Key characteristics**:
- Has acceptance criteria (testable pass/fail)
- Lives in `docs/specs/YYYY-MM-DD-slug/`
- Guides implementation, doesn't record it
- Gets archived or collapsed after PR merges

**Example**: "Add user dashboard with recent bookings widget"

**Not to be confused with**: Requirements doc (specs are smaller, time-bound)

---

### Reference (Reference Documentation)

**What it is**: Documentation that describes *what the system currently is*.

**Lifecycle**: Evergreen — must always reflect the `main` branch

**Key characteristics**:
- Always accurate to current reality
- Includes: architecture, code-map, data model, runbooks
- Updated when behavior changes
- Lives in `docs/reference/`

**Example**: `code-map.md` showing where to find authentication code

**Not to be confused with**: Specs (reference is backward-looking, specs are forward-looking)

**Alternative names**: Reference Docs, System Documentation, Current State Docs

---

### Rules (Development Patterns)

**What it is**: Guidelines and patterns for *how* to build consistently.

**Lifecycle**: Stable — evolves as patterns emerge

**Key characteristics**:
- Guides both humans and AI agents
- Enforceable > advisory
- Lives in `.cursor/rules/` or `.ai-rules/`
- Domain-specific patterns and conventions

**Example**: "ALWAYS use `@/` path aliases, NEVER relative imports deeper than one level"

**Not to be confused with**: Linter rules (those are automated; these are documented patterns that may not be automatable)

**Alternative names**: Patterns, Standards, Conventions, AI Rules

---

### Decisions (Architecture Decision Records)

**What it is**: A record of *why* a significant decision was made.

**Lifecycle**: Append-only — never edit, only supersede with new ADR

**Key characteristics**:
- Captures context, alternatives, and consequences
- Historical record (never deleted)
- Lives in `docs/decisions/`
- Written for "future you" who forgot why

**Example**: "ADR-005: Use React Query over SWR for data fetching"

**Not to be confused with**: Specs (specs say what to build, ADRs say why we chose this approach)

**Alternative names**: ADRs, Decision Log, Architecture Records

---

## Document Lifecycle States

| State | Meaning | Applies To |
|-------|---------|------------|
| **Draft** | Being written, not yet actionable | Specs, ADRs |
| **In Progress** | Actively being implemented | Specs |
| **Done** | Implementation complete, pending archive | Specs |
| **Archived** | Historical reference, no longer active | Specs |
| **Accepted** | Decision is final | ADRs |
| **Superseded** | Replaced by newer ADR | ADRs |
| **Deprecated** | No longer recommended | ADRs, Reference |

---

## Key Concepts

### Ephemeral Documentation

**Definition**: Docs that exist for a limited time, then get archived.

**Examples**: Specs, task lists, sprint plans

**Lifecycle**: Create → Use → Archive

---

### Evergreen Documentation

**Definition**: Docs that must always reflect current reality.

**Examples**: Architecture docs, code maps, API references

**Lifecycle**: Create → Update → (Deprecate when feature removed)

---

### Append-Only Documentation

**Definition**: Docs where you only add new entries, never edit old ones.

**Examples**: ADRs, changelogs, decision logs

**Lifecycle**: Create → (Supersede with new doc)

---

### Definition of Done (DoD)

**Definition**: Checklist that must be satisfied before a PR can merge.

**See**: [README.md#definition-of-done-pr-gate](README.md#definition-of-done-pr-gate) for the full checklist.

---

### Spec Collapse

**Definition**: Replacing a completed spec's content with links to its outputs.

**Why**: Keeps spec discoverable without maintaining stale content.

**Example**:
```markdown
# User Dashboard Spec

**Status**: ✅ Completed (2025-01-02)

- **PR**: #123
- **ADR**: N/A
- **Docs**: [code-map.md](../reference/code-map.md)
```

---

### Progressive Disclosure

**Definition**: Layering documentation by depth, so readers can go deeper as needed.

**Levels**:
1. README (30 seconds)
2. Quickstart (5 minutes)
3. Reference docs (30 minutes)
4. Deep-dive references (as needed)

---

## Workflow Terms

### Forward-Looking Documentation

**Definition**: Docs about what *should be* built (plans, specs).

**Characteristic**: Can be wrong (it's a plan).

---

### Backward-Looking Documentation

**Definition**: Docs about what *was* built (reference docs, ADRs, changelogs).

**Characteristic**: Must be accurate (it's a record).

---

## Actions

| Action | When | What to Do |
|--------|------|------------|
| **Create** | Starting new work | Write spec before implementing |
| **Update** | Behavior changes | Update reference docs |
| **Archive** | Spec completed | Move to `_archive/` or collapse |
| **Supersede** | Decision changes | Write new ADR, link to old |

---

## Anti-Glossary (What NOT to Call Things)

| Don't Say | Say Instead | Why |
|-----------|-------------|-----|
| "Wiki" | Reference docs | Wikis imply detached location; these live with code |
| "Requirements" | Spec | Requirements are heavy; specs are lightweight and time-bound |
| "Standards doc" | Rules | Rules are actionable; standards are aspirational |
| "Notes" | ADR | Notes lack structure; ADRs have context + decision + consequences |
| "The docs" | Be specific | Which docs? Spec? Reference? Rules? |

---

## Abbreviations

| Abbreviation | Full Term | Usage |
|--------------|-----------|-------|
| ADR | Architecture Decision Record | `docs/decisions/ADR-001-*.md` |
| DoD | Definition of Done | PR checklist |
| AC | Acceptance Criteria | Testable conditions in specs |
| R-doc | Reference document | `docs/reference/*.md` |


