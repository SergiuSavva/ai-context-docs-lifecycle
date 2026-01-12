# GitHub Copilot Instructions

> **TEMPLATE**: Copy this file to `.github/copilot-instructions.md` in your project.
> Replace all `[bracketed]` placeholders with your project's values.
> See `../examples/copilot-instructions.md` for a filled-in example.
>
> **What is this file?** GitHub Copilot reads `.github/copilot-instructions.md`
> for project-specific context and coding guidelines.

---

## Project Overview

[Project name]: [Brief description - 1-2 sentences]

---

## Tech Stack

- **Language**: [Language]
- **Framework**: [Framework + version]
- **Database**: [Database + ORM]
- **Styling**: [CSS framework]
- **Testing**: [Test frameworks]

---

## Code Style Guidelines

### [Language]
- [Style rule 1]
- [Style rule 2]
- [Style rule 3]
- [Style rule 4]

### [Framework]
- [Framework rule 1]
- [Framework rule 2]
- [Framework rule 3]
- [Framework rule 4]

### Imports
- [Import rule 1]
- [Import rule 2]
- [Import rule 3]

### Naming Conventions
- Components: [Convention]
- Functions/variables: [Convention]
- Constants: [Convention]
- Files: [Convention]

---

## Project Structure

```
[folder]/      → [Description]
[folder]/      → [Description]
  [subfolder]/ → [Description]
  [subfolder]/ → [Description]
[folder]/      → [Description]
[folder]/      → [Description]
docs/          → Project documentation
```

---

## Patterns to Follow

### State Management
- Server state: [Approach]
- Client state: [Approach]
- Form state: [Approach]

### Data Fetching
- [Pattern 1]
- [Pattern 2]
- [Pattern 3]

### Error Handling
- [Pattern 1]
- [Pattern 2]
- [Pattern 3]

### Testing
- Unit tests: [Location]
- Integration tests: [Location]
- E2E tests: [Location]

---

## Component Template

When creating components, follow this pattern:

```[language]
interface [ComponentName]Props {
  // Required props first
  [prop]: [type];
  // Optional props after
  [prop]?: [type];
}

export function [ComponentName]({ [props] }: [ComponentName]Props) {
  return (
    <[element]>
      {/* content */}
    </[element]>
  );
}
```

---

## API Route Template

When creating API routes, follow this pattern:

```[language]
// Import statements

const RequestSchema = [validation schema]

export async function [METHOD](request: Request) {
  try {
    // Parse and validate
    // Handle request
    // Return response
  } catch (error) {
    // Handle errors
  }
}
```

---

## Common Gotchas

1. **[Gotcha 1]**: [Description]
2. **[Gotcha 2]**: [Description]
3. **[Gotcha 3]**: [Description]
4. **[Gotcha 4]**: [Description]
5. **[Gotcha 5]**: [Description]

---

## Documentation

- Specs (what to build): `docs/specs/`
- Features (implementation details): `docs/features/`
- Decisions (why we chose X): `docs/decisions/`
- Progress tracking: `docs/TASKS.md`

---

## Before Suggesting Code

1. Check if similar patterns exist in codebase
2. Follow established naming conventions
3. Consider [framework-specific] requirements
4. Add appropriate types
5. Include error handling
