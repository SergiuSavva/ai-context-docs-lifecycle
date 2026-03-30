---
name: docs
description: Create and maintain reference docs, ADRs, and guides. Use when writing or updating docs/, creating architecture decision records, or auditing doc quality. Fully independent from the feature workflow.
---

# Reference Documentation

> **Templates:** `.agents/skills/docs/templates/docs/`

## What Reference Docs Are

Reference docs are **activation-layer** content — loaded on demand when a task needs context. They are evergreen data references, not procedures.

Contrast with other context types:
- **AGENTS.md** — always loaded, compact routing (load skill `acdl`)
- **Skills** — procedure-driven, teach AI how to behave in a domain
- **Reference docs** — data-driven, describe what exists in the project

**Core rule**: Stale docs are worse than no docs. Every doc is either current or deleted.

---

## Phase Routing

| Command | Purpose |
|---------|---------|
| `/docs create` | Create reference docs for detected project signals |
| `/docs update` | Update docs after code changes (feature shipped, API changed, etc.) |
| `/docs audit` | Check all docs/ for freshness, propose updates or deletions |
| `/docs adr` | Create an architecture decision record |
| `/docs review` | Review a specific doc for quality against the rules below |

---

## Phase: create

> Create reference docs that match real project signals. Never create docs speculatively.

### Step 1: Detect Signals

Scan the project to determine which docs are needed:

| Signal | Detection | Creates |
|--------|-----------|---------|
| Multi-layer structure | Services, layers, microservices | `docs/architecture.md` |
| Database present | Migrations, schema, ORM, SQL | `docs/data-model.md` |
| API surface | `api/`, `routes/`, server actions | `docs/api.md` |
| Auth present | Middleware, providers, login flows | `docs/auth.md` |
| Runnable commands | Scripts, targets, task files | `docs/scripts.md` |

### Step 2: Preview

Show the user which docs you'll create and wait for confirmation before writing.

### Step 3: Write

Use the templates below. Fill in project-specific content. Follow the Doc Structure Pattern.

### Doc Structure Pattern

Every reference doc follows this structure:

```markdown
# {{Doc Title}}

> {{One sentence: what this doc covers.}}

## Overview
{{1-2 sentences. What this describes, why it matters.}}

## {{Core Section}}
{{Tables, diagrams, code examples.}}

## Related
- @docs/other-doc.md
```

### Templates

| Doc | Template Path | When to Create |
|-----|---------------|----------------|
| `architecture.md` | `.agents/skills/docs/templates/docs/architecture.md` | Multi-layer or service structure |
| `data-model.md` | `.agents/skills/docs/templates/docs/data-model.md` | Database present |
| `api.md` | `.agents/skills/docs/templates/docs/api.md` | API surface exposed or consumed |
| `auth.md` | `.agents/skills/docs/templates/docs/auth.md` | Authentication flows present |
| `scripts.md` | `.agents/skills/docs/templates/docs/scripts.md` | Non-obvious runnable commands |
| `decisions/adr.md` | `.agents/skills/docs/templates/docs/decisions/adr.md` | Significant architecture decision |

---

## Phase: update

> Update docs after code changes. Run in the same PR as the code change.

1. Identify which docs are affected by the change:

| Change | Update (if doc exists) |
|--------|------------------------|
| Data schema/model change | `docs/data-model.md` |
| API/action surface change | `docs/api.md` |
| Architecture change | `docs/architecture.md` + create ADR |
| Auth flow change | `docs/auth.md` |

2. Read the current doc and the code diff
3. Update only the sections that changed — don't rewrite unaffected content
4. If a doc references files/paths that no longer exist, fix or remove the references

---

## Phase: audit

> Check all docs/ for freshness. Propose updates or deletions.

1. List all files in `docs/`
2. For each file, check:
   - Referenced paths still exist in the codebase
   - Commands match current project config (package.json, Makefile, etc.)
   - Described patterns still match actual code
3. Report status for each doc: **Current** / **Needs Update** / **Delete**
4. Propose specific updates or deletions
5. **Wait for user confirmation before making changes**

---

## Phase: review

> Review a specific doc for quality against the rules in Doc Quality Rules below.

1. Read the doc
2. Check against each quality rule
3. Report issues found with specific line references
4. Propose fixes, wait for confirmation

---

## Phase: adr

> Create an architecture decision record for a significant technical choice.

### When to Create

- Architecture or integration strategy selection
- Trade-off with alternatives considered
- Major technology or policy choice
- Breaking behavior or long-term constraint

### When to Skip

- Routine bug fixes, straightforward refactors
- Using a library exactly as documented
- Decisions with no meaningful alternatives

### Format

Use the template at `.agents/skills/docs/templates/docs/decisions/adr.md`:

```markdown
# ADR-NNN: {{Decision Title}}

**Status:** {{Proposed | Accepted | Deprecated | Superseded}}

## Decision      — What was decided
## Rationale     — Why (with comparison table of alternatives)
## Consequences  — Positive and negative
```

### Rules

- Number sequentially: `001-`, `002-`, etc.
- Status tracks lifecycle: Proposed → Accepted → (optionally) Deprecated/Superseded
- List alternatives with rejection reasons
- Consequences include both positives AND trade-offs
- ADRs are **permanent** — never deleted, even if the decision is later reversed

---

## Doc Quality Rules

| Rule | Why |
|------|-----|
| One topic per doc | Keeps context loading targeted |
| Lead with a diagram | Mermaid gives spatial understanding fast |
| Tables for catalogs | Endpoints, entities, commands — always tabular |
| Code examples from YOUR project | Generic examples waste tokens |
| Cross-reference, don't duplicate | `@docs/` links — never copy-paste |

### Guides & READMEs

- Start with who + what they'll learn
- Number the steps
- Include exact commands (copy-paste beats interpretation)
- End with "What's Next?" (guides connect, not dead-end)

### Templates & Placeholders

| Syntax | Meaning |
|--------|---------|
| `{{variable-name}}` | Single value replacement |
| `{{Option A \| Option B}}` | Choice between alternatives |
| `{{e.g., example}}` | Hint showing expected format |

### Cross-Referencing

| Referencing | Format |
|-------------|--------|
| Doc file | `@docs/<path>` |
| Skill | `load skill \`<name>\`` |
| ADR | `@docs/decisions/<NNN>-<name>.md` |

**Rule**: Only reference docs that exist. Dead links are worse than no links.

---

## Doc Freshness

Docs are **evergreen** — always current or deleted. Never stale. Update docs in the same PR as code changes (see `/docs update` phase above).

### Staleness Signals

- Doc references files/paths that no longer exist
- Commands in doc don't match project config
- Doc describes patterns the codebase no longer follows

When these signals appear, run `/docs audit` or `/docs update`.

---

## Anti-Patterns

| Anti-Pattern | Fix |
|--------------|-----|
| Wall of prose | Break into tables + bullets |
| Generic examples ("foo", "bar") | Use real project examples |
| Duplicating content across docs | Cross-reference with `@docs/` |
| No "Related" section | Always link to connected docs/skills |
| Doc with no clear audience | Start with who this is for |

---

## When NOT to Use

- **Creating or updating AGENTS.md** → `load skill acdl`
- **Writing feature specs** (spec.md, tasks.md) → `load skill feature`
- **Documenting code patterns** → `load skill patterns`
- **Writing code** → use stack-specific skills

---

## Quick Checklist

- [ ] Only docs that match real project signals exist
- [ ] Each doc covers one topic
- [ ] No doc references paths or commands that don't exist
- [ ] ADRs created for significant architecture decisions
- [ ] Cross-references use `@docs/` links, no duplication
- [ ] Guides end with "What's Next?" section
- [ ] Docs updated in same PR as code changes

## Related

- load skill `acdl` — for AGENTS.md authoring and system setup
- load skill `feature` — feature closeout may trigger doc updates
- load skill `patterns` — codebase patterns (separate from reference docs)
