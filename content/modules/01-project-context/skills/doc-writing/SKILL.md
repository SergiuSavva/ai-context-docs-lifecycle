---
name: doc-writing
description: Write and maintain quality markdown documentation — reference docs, guides, READMEs, ADRs, and templates. Covers structure, style, placeholders, and freshness rules. Use when writing or reviewing any .md file in the project.
---

# Doc Writing

> **References:** Templates → @docs/ | ADR template → @docs/decisions/

## Three Rules

Every doc follows three rules — no exceptions:

| Rule | Meaning |
|------|---------|
| **Value only** | Every line must help someone do something. Cut history, obvious statements, verbose explanations. |
| **Structure over prose** | Tables and bullets, not paragraphs. Scannable beats readable. |
| **Visual over text** | Use Mermaid diagrams for workflows, architecture, decision trees. If a diagram needs explanation, simplify it. |

---

## Doc Type Routing

```
What are you writing?
├─ Project context file? → AGENTS.md (load skill `agents-md`)
├─ Feature spec? → specs/ (load skill `spec-writing`)
├─ Reference doc? → docs/ (see "Reference Docs" below)
├─ Architecture decision? → docs/decisions/ (see "ADRs" below)
├─ Guide or README? → See "Guides & READMEs" below
└─ Template with placeholders? → See "Templates" below
```

---

## Section Ordering

All docs follow the same structural spine:

```
1. Title + optional tagline (> one-sentence summary)
2. Overview (1-2 sentences — what and why)
3. Core content (tables, diagrams, code examples)
4. Anti-patterns (optional — common mistakes)
5. Related / Related Docs (always last)
```

---

## Reference Docs (`docs/`)

Reference docs are **activation-layer** content — loaded on demand when a task needs context. Only create docs that match real project needs.

### Structure Pattern

```markdown
# {{Doc Title}}

> {{One sentence: what this doc covers.}}

## Overview
{{1-2 sentences. What this describes, why it matters.}}

## {{Core Section}}
{{Tables, diagrams, code examples.}}

## Related
- @docs/other-doc.md
- load skill `relevant-skill`
```

### Which Docs to Create

Only create docs matching detected project signals. For the full signal → doc detection table, see `load skill acdl` (Bootstrap Phase 1: Detect).

### Quality Rules

| Rule | Why |
|------|-----|
| One topic per doc | Keeps context loading targeted |
| Lead with a diagram | Mermaid gives spatial understanding fast |
| Tables for catalogs | Endpoints, entities, commands — always tabular |
| Code examples from YOUR project | Generic examples waste tokens |
| Cross-reference, don't duplicate | `@docs/` and `load skill` — never copy-paste |

---

## ADRs (`docs/decisions/`)

Architecture Decision Records are **permanent**. Never deleted, even if the decision is later reversed.

### Format

Use the ADR template at `.agents/skills/feature-workflow/templates/adr.md`. Key sections:

```markdown
# ADR-NNN: {{Decision Title}}

**{{Proposed | Accepted | Deprecated | Superseded by ADR-NNN}}**

## Context       — Why this decision was needed
## Decision      — What was decided
## Rationale     — Why (with key factors)
## Consequences  — Positive, Negative, Neutral
## Alternatives  — What was rejected and why
## Metadata      — Date, decision makers, related feature
```

### ADR Rules

- Number sequentially: `001-`, `002-`, etc.
- Status tracks lifecycle: Proposed → Accepted → (optionally) Deprecated/Superseded
- List alternatives with rejection reasons — makes the "why" scannable
- Consequences include both positives AND trade-offs

---

## Guides & READMEs

Guides teach workflows. READMEs orient readers.

### Guide Pattern

```markdown
# {{Guide Title}}

> {{One sentence: who this is for and what they'll learn.}}

## {{Step-by-step sections}}
{{Numbered steps with exact commands, code, or examples.}}

## What's Next?
{{Where to go from here — links to related docs.}}
```

### README Pattern

```markdown
# {{Project/Module Name}}

> {{One sentence: what this is.}}

## {{The Problem / Why}}
## {{What This Does / What You Get}}
## {{How to Use / Setup}}
## {{What's Next?}}
```

### Rules

| Rule | Why |
|------|-----|
| Start with who + what they'll learn | Reader decides in 5 seconds if this is for them |
| Number the steps | Prevents ambiguity about order |
| Include exact commands | Copy-paste beats interpretation |
| End with "What's Next?" | Guides connect, not dead-end |

---

## Templates

Templates use `{{placeholder}}` syntax and are filled by AI agents or humans during setup.

### Placeholder Conventions

| Syntax | Meaning | Example |
|--------|---------|---------|
| `{{variable-name}}` | Single value replacement | `{{project-name}}` |
| `{{Option A \| Option B}}` | Choice between alternatives | `{{Proposed \| Accepted}}` |
| `{{e.g., example}}` | Hint showing expected format | `{{e.g., TypeScript 5.3}}` |
| `{{YYYY-MM-DD}}` | Format hint | Date format |

### Template Rules

- Every placeholder has a descriptive name — `{{tech-stack}}` not `{{value}}`
- Include format hints for non-obvious fields
- Templates must be valid markdown even before filling (no broken syntax)

---

## Cross-Referencing

| Referencing | Format | Example |
|-------------|--------|---------|
| Doc file | `@docs/<path>` | `@docs/architecture.md` |
| Skill | `load skill \`<name>\`` | `load skill \`database\`` |
| ADR | `@docs/decisions/<NNN>-<name>.md` | `@docs/decisions/001-server-first.md` |

**Rule**: Only reference docs that exist. Dead links are worse than no links.

---

## Freshness Rules

Docs are **evergreen** — always current or deleted. Never stale. For full update triggers, see `load skill acdl` (Maintenance Triggers).

### Staleness Signals

- Doc references files/paths that no longer exist
- Commands in doc don't match project config / scripts
- Doc describes patterns the codebase no longer follows

---

## Anti-Patterns

| Anti-Pattern | Fix |
|--------------|-----|
| Wall of prose | Break into tables + bullets |
| Generic examples ("foo", "bar") | Use real project examples |
| Duplicating content across docs | Cross-reference with `@docs/` or `load skill` |
| No "Related" section | Always link to connected docs/skills |
| Placeholder without hint | Add descriptive name or format hint |
| Doc with no clear audience | Start with who this is for |
| History/changelog in doc body | Use git history, not inline changelogs |

---

## When NOT to Use

- Writing or updating **AGENTS.md** → `load skill agents-md`
- Writing **feature specs** (spec.md, tasks.md) → `load skill spec-writing`
- Writing **code** or implementation → use stack-specific skills
- Setting up **ACDL methodology** → `load skill acdl`

## Quick Checklist

- [ ] Doc follows: value only, structure over prose, visual over text
- [ ] Section order: title → overview → core content → (anti-patterns) → related
- [ ] Tables used for catalogs, comparisons, and option lists
- [ ] Mermaid used for workflows, architecture, and decision flows
- [ ] Cross-references use `@docs/` and `load skill` format
- [ ] No dead links — every reference points to an existing file
- [ ] Placeholders use `{{descriptive-name}}` with format hints
- [ ] Doc is evergreen — matches current state of the project
- [ ] "Related" section at the end links to connected docs/skills

## Related Docs

- load skill `agents-md`
- load skill `acdl`
- load skill `spec-writing`
