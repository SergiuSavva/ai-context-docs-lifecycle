# Feature Backlog

> **Template**: Copy to `docs/BACKLOG.md`
> Prioritized list of features to build.

---

## Feature States

| State | Meaning |
|-------|---------|
| 💡 Idea | Concept, not yet specified |
| 📋 Specified | Has feature spec in `docs/specs/` |
| ✅ Ready | Spec approved, ready to build |
| 🔨 In Progress | Currently being implemented |
| ✓ Complete | Shipped and documented |
| ⏸️ On Hold | Paused for some reason |

---

## Priority: High

Features to build first.

| Feature | State | Spec | Notes |
|---------|-------|------|-------|
| [User Authentication] | 🔨 In Progress | [specs/auth/](./specs/auth/) | OAuth with Google |
| [Dashboard] | 📋 Specified | [specs/dashboard/](./specs/dashboard/) | User home page |
| [Feature 3] | ✅ Ready | [specs/feature3/](./specs/feature3/) | |

---

## Priority: Medium

Build after high priority complete.

| Feature | State | Spec | Notes |
|---------|-------|------|-------|
| [Feature 4] | 💡 Idea | - | Needs research |
| [Feature 5] | 💡 Idea | - | |
| [Feature 6] | 📋 Specified | [specs/feature6/](./specs/feature6/) | |

---

## Priority: Low

Nice to have, build if time permits.

| Feature | State | Spec | Notes |
|---------|-------|------|-------|
| [Feature 7] | 💡 Idea | - | Future consideration |
| [Feature 8] | 💡 Idea | - | |

---

## Completed

| Feature | Completed | Docs |
|---------|-----------|------|
| [Core Setup] | 2026-01-15 | [features/setup/](./features/setup/) |
| [Feature 0] | 2026-01-18 | [features/feature0/](./features/feature0/) |

---

## On Hold

| Feature | Reason | Resume When |
|---------|--------|-------------|
| [Feature X] | Waiting on API access | API available |

---

## How to Use

### Adding a Feature

1. Add to appropriate priority section
2. State: 💡 Idea
3. When ready to spec, create `docs/specs/<feature>/`
4. Update state to 📋 Specified

### Starting a Feature

1. Ensure spec is approved
2. Update state to 🔨 In Progress
3. Follow Module 3 workflows

### Completing a Feature

1. Move to Completed section
2. Add completion date
3. Link to feature docs
4. Remove from priority section

---

*Last updated: [Date]*
