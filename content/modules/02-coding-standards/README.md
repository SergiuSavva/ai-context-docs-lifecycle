# Module 2: Coding Standards

> **Universal code and documentation style rules** for AI agents.

---

## The Problem

AI generates code in its own style, not yours. Without guidance:
- Naming varies: `getUserById` vs `fetchUser` vs `get_user`
- Patterns differ: functional vs class components, default vs named exports
- Documentation inconsistent: some files documented, others not

**The solution**: Give AI explicit rules it reads before generating code.

---

## What This Module Does

Provides Cursor rule templates (`.mdc` files) that tell AI agents how to write code and documentation consistently in your project.

## When to Use

- Want consistent code style across AI-generated code
- Want documentation to follow a standard format
- Working with a team (human or AI) that needs shared conventions

## What You Get

```
your-project/
└── .cursor/
    └── rules/
        ├── code-style.mdc    # Code patterns and conventions
        └── doc-style.mdc     # Documentation standards
```

---

## Setup

### Step 1: Create Rules Folder

```bash
mkdir -p .cursor/rules
```

### Step 2: Copy Templates

Copy the templates from `templates/.cursor/rules/` to your project:
- `code-style.mdc`
- `doc-style.mdc`

### Step 3: Customize

Edit each file to match your project's conventions:
- Language-specific patterns
- Naming conventions
- Documentation format

---

## Templates

### code-style.mdc

Defines code patterns and conventions:

- Language preferences (TypeScript vs JavaScript)
- Naming conventions (camelCase, PascalCase)
- Component patterns (functional vs class)
- Error handling approach
- Import organization

See: `templates/.cursor/rules/code-style.mdc`

### doc-style.mdc

Defines documentation standards:

- Comment format
- README structure
- Inline documentation
- When to document

See: `templates/.cursor/rules/doc-style.mdc`

---

## Examples

See `examples/.cursor/rules/` for filled-in examples based on a TypeScript/React project.

---

## How Rules Work

Cursor automatically loads `.mdc` files from `.cursor/rules/` based on the `globs` pattern in each file:

```yaml
---
description: TypeScript code style
globs:
  - "**/*.ts"
  - "**/*.tsx"
---
```

When you're editing a `.ts` or `.tsx` file, this rule is loaded and the AI follows it.

---

## Customization Tips

### For Different Languages

Change the globs to match your language:

```yaml
# Python
globs: ["**/*.py"]

# Go
globs: ["**/*.go"]

# Rust
globs: ["**/*.rs"]
```

### For Monorepos

Create package-specific rules:

```
.cursor/rules/
├── code-style.mdc          # Shared
├── frontend-patterns.mdc   # apps/web/**
└── api-patterns.mdc        # apps/api/**
```

---

## Prerequisites

- [Module 1: Quick Start](../01-quick-start/README.md) - AGENTS.md (optional but recommended)

## What's Next?

- [Module 3: Feature Development](../03-feature-development/README.md) - Workflows for building features
