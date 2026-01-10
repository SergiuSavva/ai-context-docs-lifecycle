---
title: Cursor Rules Templates
description: Index and pattern files that guide AI behavior for your codebase
head: []
---

## Purpose

Cursor rules encode your project's patterns so AI follows them automatically. The `00-index.mdc` file is required and lists all other rules.

**Update when:** New patterns emerge or existing patterns change.

---

## 00-index.mdc (Required)

Every project MUST have this file. It lists all rules and serves as entry point.

````markdown
---
description: Master index of project rules
alwaysApply: true
---

# Project Rules Index

## Active Rules

| Rule | Purpose | Applies To |
|------|---------|------------|
| `project-architecture.mdc` | Architecture patterns | All code |
| `coding-patterns.mdc` | Naming and style | All code |
| `testing-strategy.mdc` | Test patterns | Test files |

## How Rules Work

- Rules in this folder guide AI behavior
- AI reads relevant rules based on file patterns (globs)
- Update rules when patterns change
- Delete rules that no longer apply

## Quick Reference

### Adding a New Rule
1. Create `rule-name.mdc` in this folder
2. Add YAML frontmatter with `description` and `globs`
3. Add to the table above

### Rule Format
```yaml
---
description: When this rule applies
globs: ["**/*.ts"]  # File patterns
alwaysApply: false
---
```
````

---

## project-architecture.mdc

Architecture patterns and structure decisions.

````markdown
---
description: Project architecture patterns and structure
globs: ["**/*.ts", "**/*.tsx"]
alwaysApply: false
---

# Project Architecture

## Directory Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Route components
├── services/       # Business logic and API
├── hooks/          # Custom React hooks
├── utils/          # Pure utility functions
└── types/          # TypeScript definitions
```

## Layer Rules

### Components (`src/components/`)
- Pure presentational when possible
- Props interface in same file
- No direct API calls

### Services (`src/services/`)
- All business logic here
- Async operations only
- Return typed responses

### Hooks (`src/hooks/`)
- Prefix with `use`
- Composable and reusable
- Handle loading/error states

## Import Order

1. External packages
2. Internal absolute imports
3. Relative imports
4. Types (with `type` keyword)

```typescript
import { useState } from 'react';
import { Button } from '@/components/Button';
import { formatDate } from './utils';
import type { User } from '@/types';
```
````

---

## coding-patterns.mdc

Naming conventions and code style.

````markdown
---
description: Coding conventions and style patterns
globs: ["**/*.ts", "**/*.tsx", "**/*.js"]
alwaysApply: false
---

# Coding Patterns

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `UserProfile` |
| Functions | camelCase | `getUserData` |
| Constants | UPPER_SNAKE | `MAX_RETRIES` |
| Files (components) | PascalCase | `UserProfile.tsx` |
| Files (utils) | kebab-case | `date-utils.ts` |

## Function Patterns

### Prefer Arrow Functions
```typescript
// ✅ Good
const fetchUser = async (id: string): Promise<User> => {
  // ...
};

// ❌ Avoid
function fetchUser(id: string): Promise<User> {
  // ...
}
```

### Early Returns
```typescript
// ✅ Good
const processUser = (user: User | null) => {
  if (!user) return null;
  if (!user.active) return null;
  return transformUser(user);
};
```

## Error Handling

```typescript
// ✅ Use Result types for expected errors
type Result<T> = { ok: true; data: T } | { ok: false; error: string };

// ✅ Throw for unexpected errors only
if (!config) throw new Error('Config not initialized');
```
````

---

## testing-strategy.mdc

Testing patterns and conventions.

````markdown
---
description: Testing strategy and patterns
globs: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts"]
alwaysApply: false
---

# Testing Strategy

## Test Organization

```
src/
├── components/
│   ├── Button.tsx
│   └── Button.test.tsx    # Co-located
└── __tests__/
    └── integration/       # Integration tests
```

## Naming Convention

```typescript
describe('ComponentName', () => {
  describe('methodName', () => {
    it('should [expected behavior] when [condition]', () => {
      // ...
    });
  });
});
```

## Testing Patterns

### Arrange-Act-Assert
```typescript
it('should update user name', () => {
  // Arrange
  const user = createTestUser();
  
  // Act
  const result = updateUserName(user, 'New Name');
  
  // Assert
  expect(result.name).toBe('New Name');
});
```

### Test User Behavior, Not Implementation
```typescript
// ✅ Good - tests behavior
it('should show error message when form is invalid', () => {
  render(<Form />);
  fireEvent.click(screen.getByText('Submit'));
  expect(screen.getByText('Name is required')).toBeInTheDocument();
});

// ❌ Avoid - tests implementation
it('should set isError to true', () => {
  // ...
});
```
````

---

## Customization Tips

1. **Start minimal** — Add rules as patterns emerge
2. **Be specific** — Vague rules get ignored
3. **Include examples** — Show don't tell
4. **Update or delete** — Stale rules cause confusion

---

## Copy Path

Create these files at: `/.cursor/rules/`
