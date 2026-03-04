---
name: agents-md
description: How to write and maintain AGENTS.md — section anatomy, token budget, router pattern, and update triggers. Use when creating or updating project context files.
---

# AGENTS.md Authoring

> **References:** @AGENTS.md

## Router Pattern

Keep AGENTS.md **compact (50-80 lines, 150 max)**. It's a router, not a manual.

```
AGENTS.md (always loaded, ~500-700 tokens)
    ↓ routes to
Skills (.agents/skills/) — on-demand, ~1,600-1,800 tokens each
    ↓ references
docs/ — detailed reference, variable tokens
```

---

## Essential Sections

Every AGENTS.md needs these six core sections:

| Section | What to Include |
|---------|-----------------|
| **Overview** | One sentence: what this project does |
| **Stack** | Tech + versions table (framework, language, DB, styling) |
| **Commands** | Build, test, lint, dev — exact runnable commands |
| **Structure** | Directory tree with key areas for routing |
| **Context Loading** | Task → doc/skill routing table |
| **Boundaries** | Always / Ask First / Never rules |

The ACDL template also includes routing sections (Discovery -> Activation -> Execution, Task Mode Routing) that describe the context loading model. These are recommended for projects using the full methodology.

---

## What Goes Where

| Content | AGENTS.md | SKILL.md | docs/ |
|---------|-----------|----------|-------|
| Project overview, stack | Yes | No | No |
| Commands (exact syntax) | Yes | No | No |
| Boundaries | Yes | No | No |
| Skill routing table | Yes | No | No |
| Deep domain procedures | No | Yes | No |
| Architecture, data model | No | No | Yes |
| Decision records (ADRs) | No | No | Yes |

**Rule of thumb**: If it fits in one bullet point → AGENTS.md. If it needs code examples and multiple sections → skill. If it's reference content → docs/.

---

## Context Loading Table

Route tasks to the right context:

```markdown
## Context Loading

| Task | Read First |
|------|------------|
| {{task relevant to your project}} | @docs/{{relevant-doc}}.md |
| {{task relevant to your project}} | load skill `{{relevant-skill}}` |
| Building a feature | load skill `feature-workflow` |
```

Only include entries for docs and skills that exist in the project. Keep entries specific — vague routing ("general development") wastes context.

---

## Boundaries Format

Use three tiers:

```markdown
## Boundaries

### Always
- Run tests before committing
- Follow existing patterns in codebase

### Ask First
- Adding new dependencies
- Database schema changes

### Never
- Commit .env files or secrets
- Push directly to main
```

---

## Update Triggers

Modify AGENTS.md when:

| Change | Update |
|--------|--------|
| New dependency / framework added | Stack table |
| New command added | Commands section |
| Directory structure changes | Structure section |
| New skill created | Context Loading table |
| New docs/ file added | Context Loading table |
| New boundary discovered (mistake happened) | Boundaries section |

Do **not** update AGENTS.md for every feature. Only update when project-level patterns change.

---

## When NOT to Use This Skill

- Writing **stack-specific patterns** (use a dedicated stack skill like `database`, `testing`)
- Writing **detailed reference docs** (create a file in `docs/` instead)
- Working on **feature specs** (use `spec-writing` or `feature-workflow` skills)

---

## Anti-Patterns

| Anti-Pattern | Fix |
|--------------|-----|
| Vague persona ("helpful assistant") | Replace with specific stack and conventions |
| Missing commands | Add exact runnable commands early |
| No boundaries | Add Always / Ask First / Never |
| Generic tech ("React project") | Be specific ("React 18 + TypeScript 5.3") |
| All content inline (200+ lines) | Move detail to docs/ and skills, keep AGENTS.md as router |

---

## Quick Checklist

- [ ] Overview describes what the project does in one sentence
- [ ] Stack table has tech names and versions
- [ ] Commands section has install, dev, test, lint, build
- [ ] Structure section matches actual directory layout
- [ ] Context Loading table routes to docs and skills
- [ ] Boundaries has all three tiers (Always / Ask First / Never)
- [ ] Total file stays under 150 lines

## Related Docs

- @AGENTS.md
- load skill `feature-workflow`
