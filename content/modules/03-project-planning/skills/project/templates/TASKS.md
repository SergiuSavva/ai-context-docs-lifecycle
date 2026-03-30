# Global Progress

> **Template**: Copy to `TASKS.md`
> High-level progress tracking across all features.
> Replace all `{{bracketed}}` placeholders.

> **Scope**: TASKS.md owns **progress tracking and velocity**. For feature priorities, see `BACKLOG.md`. For phase/release grouping, see `ROADMAP.md`. For per-feature task lists, see `specs/<feature>/tasks.md`.

---

## Summary

| Phase | Features | Complete | Progress |
|-------|----------|----------|----------|
| MVP | {{count}} | {{count}} | {{percent}}% |
| Phase 2 | {{count}} | {{count}} | {{percent}}% |
| **Total** | **{{count}}** | **{{count}}** | **{{percent}}%** |

---

## MVP Progress

### Complete

| Feature | Completed | ADR |
|---------|-----------|-----|
| {{Feature}} | {{Date}} | - |
| {{Feature}} | {{Date}} | `docs/decisions/{{NNN-name}}.md` |

### In Progress

| Feature | Progress | Spec | Blocked |
|---------|----------|------|---------|
| {{Feature}} | {{percent}}% | `specs/{{feature}}/` | No |

### Up Next

| Feature | Spec |
|---------|------|
| {{Feature}} | `specs/{{feature}}/` |
| {{Feature}} | Not started |

---

## Phase 2 Progress

### Planned

| Feature | Notes |
|---------|-------|
| {{Feature}} | After MVP |
| {{Feature}} | |
| {{Feature}} | |

---

## Blocked Items

| Feature | Blocked By | Action Needed |
|---------|------------|---------------|
| {{None currently}} | - | - |

---

## Recent Activity

| Date | Feature | Action |
|------|---------|--------|
| {{Date}} | {{Feature}} | {{Action}} |
| {{Date}} | {{Feature}} | {{Action}} |
| {{Date}} | {{Feature}} | {{Action}} |

---

## Metrics

### Velocity

| Week | Features Completed | Notes |
|------|--------------------|-------|
| {{Week}} | {{count}} | {{Notes}} |
| {{Week}} | {{count}} | {{Notes}} |

### Burndown

Update the bar after each feature completes. Adjust the filled/empty blocks to match the ratio.

```
Features remaining: {{filled}}{{empty}} {{done}}/{{total}} ({{phase}})
```

Example: `████████░░ 8/10 (MVP)` means 8 of 10 features remain.

---

## How to Update

### When Feature Completes

1. Move to "Complete" section
2. Update Summary table (recalculate counts and percentages)
3. Update Burndown bar
4. Add to Recent Activity

### When Feature Starts

1. Move to "In Progress" section
2. Update progress percentage
3. Add to Recent Activity

### When Blocked

1. Add to Blocked Items section
2. Document what's needed to unblock

---

*Last updated: {{Date}}*
