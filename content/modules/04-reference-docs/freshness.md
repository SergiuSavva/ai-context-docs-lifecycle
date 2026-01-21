# Documentation Freshness

> **The "Update or Delete" Rule** - Stale docs are worse than no docs.

---

## The Problem

Documentation becomes stale when:
- Code changes but docs don't
- Features are removed but docs remain
- Patterns evolve but docs describe old patterns

Stale docs are harmful because:
- AI agents follow outdated patterns
- Developers trust inaccurate information
- Time is wasted debugging doc/code mismatches

---

## The Solution: Update or Delete

Every reference document follows this rule:

```
Is this document accurate?
├─ YES → Keep it
└─ NO → Update it OR Delete it
         (Never leave inaccurate)
```

---

## Document Lifecycles

### Evergreen Documents

**Must always be current.** If outdated, update immediately.

| Document | Location | Update Trigger |
|----------|----------|----------------|
| AGENTS.md | Root | Any pattern/stack/structure change |
| Feature README | docs/features/ | Any feature behavior change |
| INDEX.md | docs/ | Any new/removed docs |

### Permanent Documents

**Never update content.** Only add status changes.

| Document | Location | Lifecycle |
|----------|----------|-----------|
| ADR | docs/decisions/ | Write once, never modify content |

To invalidate an ADR:
1. Create new ADR that supersedes it
2. Update old ADR status to "Superseded by ADR-XXX"

### Ephemeral Documents

**Delete after use.** Don't let them linger.

| Document | Location | Delete When |
|----------|----------|-------------|
| Feature Spec | docs/specs/ | Feature complete |
| Research | docs/specs/ | Decision made |
| Tasks | docs/specs/ | Feature complete |

---

## Update Triggers

### AGENTS.md

| Event | Section to Update |
|-------|-------------------|
| New technology added | Tech Stack |
| New pattern established | Key Patterns |
| File structure changed | File Organization |
| New gotcha discovered | Common Gotchas |
| Major feature shipped | Project Overview (maybe) |

### Feature README

| Event | Action |
|-------|--------|
| Feature implemented | Create README |
| Behavior changed | Update "How It Works" |
| Files moved/renamed | Update "Code Touchpoints" |
| API changed | Update "Usage" examples |
| Feature removed | Delete README |

### INDEX.md

| Event | Action |
|-------|--------|
| New feature README | Add link |
| New ADR | Add link |
| Doc deleted | Remove link |
| Doc moved | Update link |

---

## AI Agent Instructions

After completing Standard or Complex Flow:

```markdown
AI MUST check documentation freshness:

1. AGENTS.md
   - Is Tech Stack accurate?
   - Are Key Patterns accurate?
   - Is File Organization accurate?
   - Any new gotchas to add?

2. Feature README (if feature touched)
   - Are Code Touchpoints accurate?
   - Is "How It Works" accurate?

3. INDEX.md
   - Are all links valid?
   - Are new docs linked?

4. Action Required
   - If anything is stale: UPDATE or FLAG
   - If docs reference deleted code: DELETE doc
```

---

## Enforcement

### During Development

AI agents check freshness as part of Definition of Done:
- Standard Flow: Check Feature README
- Complex Flow: Check AGENTS.md + Feature README

### Periodic Review

Humans should review quarterly:
- [ ] AGENTS.md reflects current state
- [ ] All Feature READMEs are accurate
- [ ] No orphaned docs (reference deleted code)
- [ ] INDEX.md has no broken links

### Cursor Rule

Use `reference-freshness.mdc` to remind AI agents:

```yaml
---
description: Documentation freshness enforcement
globs: ["**/*.md", "docs/**/*"]
---

# After any feature work, verify:
# 1. AGENTS.md is current
# 2. Feature READMEs are current
# 3. No stale docs exist
```

---

## Anti-Patterns

### DON'T: Leave Outdated Docs

```markdown
# Bad: Doc says "uses REST API" but code uses GraphQL
```

**Fix**: Update doc or delete it.

### DON'T: Document Future Plans

```markdown
# Bad: "In v2, we will add..."
```

**Fix**: Document what exists now. Use roadmap for future.

### DON'T: Duplicate Information

```markdown
# Bad: Same info in AGENTS.md and Feature README
```

**Fix**: Single source of truth. Link to it.

### DON'T: Over-Document

```markdown
# Bad: 50-page doc for a simple feature
```

**Fix**: Document just enough. Code is the source of truth.

---

## Checklist

Use this when reviewing documentation:

- [ ] Does AGENTS.md match the current codebase?
- [ ] Do all Feature READMEs describe actual behavior?
- [ ] Are all links in INDEX.md valid?
- [ ] Have removed features had their docs deleted?
- [ ] Are there any docs referencing deprecated patterns?
