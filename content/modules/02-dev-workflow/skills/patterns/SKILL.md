---
name: patterns
description: Discover and document codebase patterns and conventions. Use when onboarding to a new codebase, patterns are undocumented, or AI keeps generating code that doesn't match project style.
---

# Codebase Patterns

> **Output:** `.agents/skills/patterns/patterns.md` (or split files for large codebases)

## What This Skill Does

Discovery-first pattern documentation. AI scans the codebase, identifies actual patterns in use, and writes a patterns doc. No pre-filled templates — output is derived entirely from the project.

**Core principle**: Document patterns that exist, not patterns that should exist. Aspirational conventions belong in AGENTS.md Boundaries, not here.

---

## When to Run Discovery

| Trigger | Signal |
|---------|--------|
| New codebase onboarding | No `.agents/skills/patterns/patterns.md` exists |
| AI generates wrong-style code | Repeated corrections to the same pattern |
| After major refactor | Codebase patterns diverged from docs |
| Explicit request | Run `/patterns update` |

---

## Discovery Phase

When invoked, scan before writing anything.

### Step 1: Identify Pattern Domains

Scan for these pattern types. Only document those with **3+ examples** in the codebase:

| Domain | What to Scan | Example Finding |
|--------|-------------|-----------------|
| File/module structure | How files are named, co-located, exported | "Services: class + interface in same file, named `XxxService.ts`" |
| Component/function patterns | Signatures, composition, prop patterns | "React components: named export, no default export" |
| Error handling | How errors are caught, typed, propagated | "All async fns: try/catch, return `Result<T, AppError>`" |
| Data access | How DB/API calls are structured | "Queries: repository pattern, no raw SQL in routes" |
| Testing patterns | Test file location, naming, setup style | "Tests: co-located `*.test.ts`, no global fixtures" |
| State management | How state flows, is initialized, is updated | "Client state: Zustand slices, one store per domain" |
| Import conventions | Barrel files, path aliases, ordering | "Imports: `@/` alias for src/, absolute within features" |
| Type patterns | How types are defined and shared | "Shared types: `types.ts` per module, no global types file" |

### Step 2: Extract Examples

For each pattern found with 3+ examples:
- Identify the **canonical example** (most complete, most representative)
- Note any **exceptions** and whether they're intentional

### Step 3: Preview

Report findings before writing:

```
"I found patterns in [N] domains.

Domains:
- File structure: [summary]
- Error handling: [summary]
- [...]

Output: .agents/skills/patterns/patterns.md
Split into separate files? (recommended if >5 domains)

Proceed?"
```

**Wait for confirmation before writing.**

---

## Output Format

### Single File (default, <=5 domains)

Write to `.agents/skills/patterns/patterns.md`:

```markdown
# {{Project Name}} Patterns

> Discovered from codebase scan. Update with /patterns update when patterns change.

## {{Domain Name}}

{{1-2 sentences: the pattern in plain English.}}

**Pattern:**
\`\`\`{{lang}}
{{canonical example from actual codebase — not invented}}
\`\`\`

**Rules:**
- {{specific rule derived from observed pattern}}
- {{exception if any: "Exception: legacy code in /old-api uses X instead"}}
```

### Split Files (>5 domains, or on request)

Create one file per domain in `.agents/skills/patterns/`:
- `file-structure.md`
- `error-handling.md`
- `testing.md`
- etc.

Add routing in AGENTS.md Context Loading table:

```markdown
| Task | Read First |
|------|------------|
| Following code conventions | load skill `patterns` |
```

---

## Keeping Patterns Current

### Update Triggers

| Change | Action |
|--------|--------|
| Major refactor changes a pattern | Run `/patterns update` for that domain |
| New pattern established (3+ usages) | Add to patterns.md |
| AI keeps diverging from patterns | Strengthen wording or add example |
| Old pattern removed from codebase | Delete section from patterns.md |

### `/patterns update`

Re-scan the specified domain (or all domains if none specified), compare against documented patterns, show diff, write updates after confirmation.

### Staleness Detection

A patterns doc is stale when:
- It references files or paths that no longer exist
- The example code doesn't match actual code in the codebase
- Grep for a few pattern examples — if none match, the doc is stale

---

## What NOT to Document

| Skip | Why |
|------|-----|
| One-off code | Not a pattern until it appears 3+ times |
| Third-party library internals | Document YOUR usage patterns, not the library |
| Aspirational patterns | Document what IS, not what SHOULD be |
| Framework defaults | Only document where your project diverges |

---

## When NOT to Use

- **Writing reference docs** (architecture, API, data model) → `load skill docs`
- **Creating AGENTS.md** → `load skill acdl`
- **Patterns already documented and recent** — check `.agents/skills/patterns/patterns.md` first
- **Project is a prototype or spike** — patterns aren't established yet, wait until codebase stabilizes

---

## Quick Checklist

- [ ] Discovery ran before writing (scan before document)
- [ ] Each pattern has 3+ examples from actual codebase
- [ ] Code examples are copied from real files (not invented)
- [ ] AGENTS.md Context Loading table routes to patterns
- [ ] Staleness signals checked: referenced files still exist

## Related

- load skill `acdl` — add patterns routing to AGENTS.md
- load skill `feature` — patterns applied during feature build phase
- load skill `docs` — reference docs (separate from code patterns)
