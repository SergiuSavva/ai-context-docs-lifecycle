# [Feature Name]

> **Status**: Draft | In Progress | Implemented | Deprecated  
> **Owner**: [Team/Person]  
> **Last Updated**: YYYY-MM-DD

---

## Overview

<!-- 1-2 paragraphs: What is this feature? What problem does it solve? -->

[Feature description]

---

## User Stories

<!-- Who uses this and what do they need? -->

### As a [user type], I want to [action] so that [benefit]

**Acceptance Criteria**:
- [ ] Criteria 1
- [ ] Criteria 2

### As a [user type], I want to [action] so that [benefit]

**Acceptance Criteria**:
- [ ] Criteria 1
- [ ] Criteria 2

---

## Key Flows

<!-- Describe the main user/system flows. Use diagrams if helpful. -->

### Flow 1: [Name]

```
User → Action → System → Result
```

1. Step 1
2. Step 2
3. Step 3

### Flow 2: [Name]

1. Step 1
2. Step 2

---

## Architecture

<!-- How is this feature structured? -->

### Components

| Component | Location | Purpose |
|-----------|----------|---------|
| [Name] | `path/to/component` | [Purpose] |

### Data Model

<!-- Key entities and relationships -->

```
Entity A (1) ──── (N) Entity B
```

### API Endpoints (if applicable)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/resource` | [Purpose] |
| POST | `/api/resource` | [Purpose] |

---

## Configuration

<!-- Any config, env vars, feature flags -->

| Variable | Purpose | Default |
|----------|---------|---------|
| `FEATURE_FLAG_X` | Enables feature X | `false` |

---

## Dependencies

<!-- What does this feature depend on? -->

- [Dependency 1]: [Why needed]
- [Dependency 2]: [Why needed]

---

## Related Documentation

- [Spec](../specs/YYYY-MM-DD-feature/spec.md) (if in progress)
- [ADR](../decisions/ADR-XXX.md) (if architectural decisions)
- [Runbook](./runbook.md) (if in production)
- [Tests](__tests__/feature.test.ts)

---

## Tasks

<!-- Implementation checklist. Update as work progresses. -->

### Phase 1: Core Implementation
- [ ] Task 1
- [ ] Task 2

### Phase 2: Polish
- [ ] Task 3
- [ ] Task 4

**Progress**: X/Y tasks (Z%)

---

## Changelog

<!-- Log significant changes after initial release -->

### YYYY-MM-DD
- Added: [What was added]
- Changed: [What changed]
- Fixed: [What was fixed]

---

<!-- 
LIFECYCLE:
- Draft: Planning phase, not yet implemented
- In Progress: Currently being built
- Implemented: Live in production
- Deprecated: Being phased out

Update status and last_updated when making changes.
-->

