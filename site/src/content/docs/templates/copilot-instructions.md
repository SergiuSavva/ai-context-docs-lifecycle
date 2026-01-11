---
title: Copilot Instructions Template
description: Context file for GitHub Copilot
head: []
---

The `.github/copilot-instructions.md` file provides project context to GitHub Copilot. Copilot reads this file for coding guidelines and project-specific patterns.

## When to Use

Use this template if you're using **GitHub Copilot** as your AI assistant. For other tools:
- **Cursor**: Use [AGENTS.md](/templates/agents-md/) + [Cursor Rules](/templates/cursor-rules/)
- **Claude Code**: Use [CLAUDE.md](/templates/claude-md/)

## Location

```
your-project/
└── .github/
    └── copilot-instructions.md
```

## Template

```markdown
# GitHub Copilot Instructions

## Project Overview

[Project name]: [Brief description - 1-2 sentences]

---

## Tech Stack

- **Language**: TypeScript (strict mode)
- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS
- **Testing**: Vitest + Playwright

---

## Code Style Guidelines

### TypeScript
- Use strict TypeScript - no `any` types
- Prefer `interface` for object shapes, `type` for unions
- Always add explicit return types to functions

### React/Next.js
- Default to Server Components
- Add `'use client'` only when hooks or interactivity needed
- Use named exports for components
- Props interfaces named `ComponentNameProps`

### Imports
- Use `@/` path alias for all project imports
- Order: external packages → internal modules → types
- No default exports except pages/layouts

### Naming Conventions
- Components: `PascalCase`
- Functions/variables: `camelCase`
- Constants: `SCREAMING_SNAKE_CASE`
- Files: `kebab-case` (except React components)

---

## Project Structure

\`\`\`
app/           → Next.js App Router pages and API routes
components/    → Shared React components
features/      → Feature modules with collocated code
lib/           → Utilities, API clients, database
types/         → Shared TypeScript types
docs/          → Project documentation
\`\`\`

---

## Patterns to Follow

### State Management
- Server state: React Query
- Client state: Zustand
- Form state: React Hook Form + Zod

### Error Handling
- Use Error Boundaries for UI errors
- try-catch in API routes with proper status codes
- Zod for validation with helpful error messages

---

## Component Template

\`\`\`tsx
interface ComponentNameProps {
  title: string;
  className?: string;
}

export function ComponentName({ title, className }: ComponentNameProps) {
  return (
    <div className={className}>
      {title}
    </div>
  );
}
\`\`\`

---

## API Route Template

\`\`\`ts
import { NextResponse } from 'next/server';
import { z } from 'zod';

const RequestSchema = z.object({
  // Define expected shape
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = RequestSchema.parse(body);

    // Handle request

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
\`\`\`

---

## Common Gotchas

1. **Server Components**: Cannot use hooks or browser APIs
2. **Client Components**: Must add `'use client'` directive
3. **Path aliases**: Always use `@/` not relative paths
4. **Prisma**: Run `npx prisma generate` after schema changes

---

## Documentation

- Specs: `docs/specs/`
- Features: `docs/features/`
- Decisions: `docs/decisions/`
- Progress: `docs/TASKS.md`
```

## Key Sections

| Section | Purpose |
|---------|---------|
| **Tech Stack** | Quick reference for technologies |
| **Code Style** | Formatting and convention rules |
| **Project Structure** | Directory layout |
| **Patterns** | State management, error handling |
| **Templates** | Code snippets Copilot should follow |
| **Common Gotchas** | Mistakes to avoid |

## Copilot-Specific Tips

### Be Concise
Copilot works best with shorter, focused instructions. Unlike AGENTS.md or CLAUDE.md, keep this file relatively brief.

### Include Code Templates
Copilot excels when given concrete examples to follow. Include component and API route templates.

### Focus on Patterns
Emphasize coding patterns and conventions over project context. Copilot is primarily about code suggestions.

## Combining with Other Files

You can use copilot-instructions.md alongside:
- **AGENTS.md** - For team members using Cursor
- **CLAUDE.md** - For team members using Claude Code

Each tool reads its own context file, allowing teams with mixed tools to work together.
