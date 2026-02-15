---
name: ui-components
description: UI component system with shadcn/ui, Tailwind CSS 4, and theming — design tokens, component patterns, and accessibility. Use when building UI components, styling, or working with the design system.
---

# UI Component System

> **References:** Architecture (layer rules) → @docs/architecture.md | Component tests → load skill `testing`

## Stack

| Layer | Tool | Purpose |
|-------|------|---------|
| **Primitives** | shadcn/ui | Accessible, unstyled base components |
| **Styling** | Tailwind CSS 4 | Utility-first CSS with design tokens |
| **Theming** | CSS custom properties | Dynamic theme switching |
| **Icons** | Lucide React | Consistent icon set |

---

## Component Patterns

### Using shadcn/ui Components

```typescript
import { Button } from '@/shared/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Badge } from '@/shared/ui/badge'

export function TaskCard({ task }: { task: Task }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-base">{task.title}</CardTitle>
          <Badge variant={statusVariant(task.status)}>{task.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{task.description}</p>
      </CardContent>
    </Card>
  )
}
```

### Adding New shadcn/ui Components

```bash
npx shadcn@latest add dialog    # Add a component
npx shadcn@latest add -a        # Add all components
```

Components install to `src/shared/ui/`. Customize after install.

---

## Theming

### Semantic Color Tokens

```typescript
// ✅ Correct — semantic tokens (adapts to theme)
<div className="bg-background text-foreground">
  <h1 className="text-primary">Title</h1>
  <p className="text-muted-foreground">Description</p>
  <button className="bg-primary text-primary-foreground">Action</button>
  <span className="text-destructive">Error</span>
</div>

// ❌ Wrong — hardcoded colors (breaks theming)
<div className="bg-white text-black">
  <h1 className="text-blue-600">Title</h1>
</div>
```

### Available Tokens

| Token | Usage |
|-------|-------|
| `background` / `foreground` | Page background and text |
| `card` / `card-foreground` | Card surfaces |
| `primary` / `primary-foreground` | Primary actions, links |
| `secondary` / `secondary-foreground` | Secondary actions |
| `muted` / `muted-foreground` | Subtle backgrounds, helper text |
| `accent` / `accent-foreground` | Hover states, highlights |
| `destructive` / `destructive-foreground` | Errors, delete actions |
| `border` | Borders and dividers |
| `ring` | Focus rings |

### Theme Definition

```css
/* globals.css */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --destructive: 0 84.2% 60.2%;
    /* ... */
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    /* ... */
  }
}
```

---

## Layout Patterns

### Page Layout

```typescript
export default function TasksPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
        <Button>New Task</Button>
      </header>
      <main>
        <TaskBoard />
      </main>
    </div>
  )
}
```

### Card Grid

```typescript
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {tasks.map(task => (
    <TaskCard key={task.id} task={task} />
  ))}
</div>
```

### Empty State

```typescript
export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-4 mb-4">
        <InboxIcon className="size-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1 max-w-sm">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
```

---

## Accessibility

### Requirements

- All interactive elements must be keyboard accessible
- Use semantic HTML (`button`, `nav`, `main`, `header`)
- Include `aria-label` for icon-only buttons
- Maintain 4.5:1 color contrast ratio
- Focus indicators visible on all interactive elements

### Patterns

```typescript
// Icon-only button — needs aria-label
<Button size="icon" aria-label="Delete task">
  <TrashIcon className="size-4" />
</Button>

// Loading state — announce to screen readers
<Button disabled={isPending} aria-busy={isPending}>
  {isPending ? 'Saving...' : 'Save'}
</Button>

// Status badge — convey meaning beyond color
<Badge variant="destructive">
  <AlertCircle className="size-3 mr-1" />
  Overdue
</Badge>
```

---

## Responsive Patterns

```typescript
// Mobile-first responsive design
<div className="flex flex-col md:flex-row gap-4">
  <aside className="w-full md:w-64 shrink-0">
    <Sidebar />
  </aside>
  <main className="flex-1 min-w-0">
    <Content />
  </main>
</div>

// Hide on mobile, show on desktop
<nav className="hidden md:flex items-center gap-2">
  <NavLinks />
</nav>

// Mobile navigation
<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon" className="md:hidden">
      <MenuIcon className="size-5" />
    </Button>
  </SheetTrigger>
  <SheetContent side="left">
    <NavLinks />
  </SheetContent>
</Sheet>
```

---

## Utility: `cn()` Helper

Always use `cn()` for conditional/merged class names:

```typescript
import { cn } from '@/shared/lib/utils'

function TaskCard({ task, className }: TaskCardProps) {
  return (
    <div className={cn(
      'rounded-lg border p-4',
      task.status === 'done' && 'opacity-60',
      className,
    )}>
      {task.title}
    </div>
  )
}
```

---

## Quick Checklist

- [ ] Semantic color tokens only (never hardcoded)
- [ ] `cn()` for conditional classes
- [ ] Mobile-first responsive design
- [ ] `aria-label` on icon-only buttons
- [ ] Focus indicators visible
- [ ] Empty states for lists and search results
- [ ] Loading states for async content
- [ ] Error states with retry actions

## Related Docs

- Architecture & import rules: @docs/architecture.md
- Storybook & testing patterns: load skill `testing`
- Server vs Client components: load skill `nextjs-app-router`
