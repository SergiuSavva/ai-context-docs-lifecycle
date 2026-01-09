# Quick Reference Card

> 🖨️ Print this. Stick it on your wall.  
> 📖 Full details: [README.md](README.md)

---

## The Four Pillars → [README.md#the-four-pillars](README.md#the-four-pillars)

| | Pillar | What | Lifecycle | Location |
|-|--------|------|-----------|----------|
| 📋 | **Specs** | BUILD | Ephemeral | `docs/specs/` |
| 📚 | **Reference** | IS | Evergreen | `docs/reference/` |
| 📐 | **Rules** | HOW | Stable | `.cursor/rules/` |
| 📜 | **Decisions** | WHY | Append-only | `docs/decisions/` |

---

## Workflow → [README.md#the-workflow-loop](README.md#the-workflow-loop)

```
SPEC → RULES → CODE → REVIEW → REFERENCE → ADR? → CLOSE
```

---

## Definition of Done → [README.md#definition-of-done-pr-gate](README.md#definition-of-done-pr-gate)

- [ ] Spec ACs met
- [ ] Tests pass
- [ ] CI green
- [ ] Reference updated
- [ ] ADR added (if needed)
- [ ] Spec closed

---

## When to Write What → [README.md#when-to-write-what](README.md#when-to-write-what)

| Situation | Action |
|-----------|--------|
| New feature (>2h) | ✅ Spec |
| Architectural decision | ✅ ADR |
| Behavior changed | ✅ Update Reference |
| Bug fix / refactor | ❌ Skip docs |

---

## Quick Commands

```bash
# New spec
mkdir -p docs/specs/$(date +%Y-%m-%d)-NAME && cp templates/spec.md $_/

# New ADR
cp templates/adr.md docs/decisions/ADR-XXX-NAME.md

# Archive spec
mv docs/specs/YYYY-MM-DD-NAME docs/_archive/
```

---

## File Locations

| I need to... | Location |
|--------------|----------|
| Define what to build | `docs/specs/` |
| Find code location | `docs/reference/code-map.md` |
| Record a decision | `docs/decisions/ADR-NNN-*.md` |
| Guide AI | `.cursor/rules/*.mdc` |

---

## Lifecycles → [GLOSSARY.md#document-lifecycle-states](GLOSSARY.md#document-lifecycle-states)

**Spec**: `Draft → In Progress → Done → Archived`

**ADR**: `Proposed → Accepted → (Superseded)`

---

## Golden Rules

1. Spec BEFORE code
2. Reference = reality
3. Rules > advice
4. ADRs are forever
5. Archive, don't accumulate

---

## AI Loading Order → [README.md#ai-agent-operating-model](README.md#ai-agent-operating-model)

```
1. AGENTS.md
2. .cursor/rules/project.mdc
3. docs/reference/code-map.md
4. Feature docs as needed
```

---

## Quick Diagnosis

| Problem | Solution |
|---------|----------|
| AI makes wrong assumptions | Update `code-map.md` |
| Forgot why we did X | Check/write ADR |
| Docs out of date | Update reference |
| Too many open specs | Archive them |

---

## More Info

| Topic | See |
|-------|-----|
| Full methodology | [README.md](README.md) |
| Term definitions | [GLOSSARY.md](GLOSSARY.md) |
| The "why" | [PRINCIPLES.md](PRINCIPLES.md) |
| Step-by-step adoption | [IMPLEMENTATION.md](IMPLEMENTATION.md) |

---

*v1.1 — Source of truth: [README.md](README.md)*
