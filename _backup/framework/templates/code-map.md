# Code Map

> **Purpose**: Help developers and AI agents navigate the codebase quickly.  
> **Last Updated**: YYYY-MM-DD

---

## Entry Points

| Path | Purpose | When to Start Here |
|------|---------|-------------------|
| `[main entry]` | Application entry | Understanding app bootstrap |
| `[routes/pages]` | Request handling | Adding new endpoints/pages |
| `[config]` | Configuration | Changing settings |

---

## Directory Structure

```
project-root/
├── [src/app/lib]/           # [Purpose - e.g., "Application code"]
│   ├── [subdirectory]/      # [Purpose]
│   ├── [subdirectory]/      # [Purpose]
│   └── [subdirectory]/      # [Purpose]
│
├── [tests/__tests__]/       # [Purpose - e.g., "Test files"]
│   ├── [subdirectory]/      # [Purpose]
│   └── [subdirectory]/      # [Purpose]
│
├── [config]/                # [Purpose - e.g., "Configuration"]
│
├── [docs]/                  # [Purpose - e.g., "Documentation"]
│
└── [other]/                 # [Purpose]
```

---

## Key Modules

### [Module 1 Name]

**Location**: `path/to/module/`

**Purpose**: [What this module does]

**Key Files**:
| File | Purpose |
|------|---------|
| `index.ts` | Public exports |
| `[file].ts` | [Purpose] |
| `[file].ts` | [Purpose] |

**Dependencies**: [What this module depends on]

**Dependents**: [What depends on this module]

---

### [Module 2 Name]

**Location**: `path/to/module/`

**Purpose**: [What this module does]

**Key Files**:
| File | Purpose |
|------|---------|
| `index.ts` | Public exports |
| `[file].ts` | [Purpose] |

---

## Patterns by Task

### Adding a New Feature

1. Create feature folder: `[path]`
2. Add types: `[path]/types.ts`
3. Add components/handlers: `[path]/`
4. Add tests: `[test path]`
5. Export from: `[index path]`
6. Register in: `[router/config]`

### Adding a New API Endpoint

1. Create handler: `[path]`
2. Add validation: `[path]`
3. Add tests: `[path]`
4. Register route: `[path]`

### Adding a Database Table

1. Create migration: `[path]`
2. Update types: `[path]`
3. Add queries: `[path]`
4. Update docs: `docs/reference/data-model.md`

---

## Configuration Files

| File | Purpose | When to Modify |
|------|---------|----------------|
| `[config file]` | [Purpose] | [When] |
| `[config file]` | [Purpose] | [When] |
| `[config file]` | [Purpose] | [When] |

---

## External Dependencies

| Dependency | Purpose | Docs |
|------------|---------|------|
| [Package] | [Why we use it] | [Link] |
| [Service] | [Why we use it] | [Link] |

---

## Quick Find

### "Where is [X]?"

| Looking For | Location |
|-------------|----------|
| Authentication | `[path]` |
| Database queries | `[path]` |
| API routes | `[path]` |
| Shared utilities | `[path]` |
| Types/interfaces | `[path]` |
| Configuration | `[path]` |
| Tests | `[path]` |

### "How do I [X]?"

| Task | See |
|------|-----|
| Add a new page | [Link or path] |
| Add a new API | [Link or path] |
| Run tests | [Link or path] |
| Deploy | [Link or path] |

---

## Ownership (Optional)

| Area | Owner | Contact |
|------|-------|---------|
| [Module/Feature] | [Team/Person] | [Contact] |
| [Module/Feature] | [Team/Person] | [Contact] |

---

<!-- 
MAINTENANCE:
- Update when significant structure changes
- Review quarterly for accuracy
- Keep "Quick Find" section current
-->

