---
name: testing
description: Testing strategy with Vitest, Storybook, and Playwright — what goes where, patterns, and examples. Use when writing tests, creating stories, or setting up test infrastructure.
---

# Testing Strategy

> **References:** API / Server Actions → @docs/api.md | Data model (for mocks) → @docs/data-model.md

## The Golden Rule

| Tool | Purpose | Scope |
|------|---------|-------|
| **Storybook** | Show it (visuals) | Component variants, states, design |
| **Vitest** | Test it (logic) | Behavior, validation, callbacks |
| **Playwright** | Verify it (flows) | Critical user journeys, E2E |

No duplication between tools.

---

## Decision Matrix

1. **Am I testing visuals?** → Storybook
2. **Would a designer need to see this?** → Storybook
3. **Does this cross multiple pages?** → Playwright
4. **Is this a critical business flow?** → Playwright + Vitest
5. **Everything else** → Vitest

---

## File Organization

```
feature/
├── TaskCard.tsx
├── TaskCard.stories.tsx          # Visual (Storybook)
└── __tests__/
    └── TaskCard.test.tsx         # Behavior (Vitest)

__tests__/e2e/
└── task-management.spec.ts      # Journeys (Playwright)
```

---

## Storybook Patterns

### Basic Template

```typescript
import type { Meta, StoryObj } from '@storybook/react'
import { TaskCard } from './TaskCard'

const meta = {
  title: 'Features/TaskCard',
  component: TaskCard,
  tags: ['autodocs'],
} satisfies Meta<typeof TaskCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { task: mockTask },
}

export const Completed: Story = {
  args: { task: { ...mockTask, status: 'done' } },
}

export const Overdue: Story = {
  args: { task: { ...mockTask, dueDate: '2024-01-01' } },
}
```

### All States Comparison

```typescript
export const AllStates: Story = {
  name: '🎨 All States',
  render: () => (
    <div className="space-y-4">
      <TaskCard task={{ ...mockTask, status: 'todo' }} />
      <TaskCard task={{ ...mockTask, status: 'in_progress' }} />
      <TaskCard task={{ ...mockTask, status: 'done' }} />
      <TaskCard task={{ ...mockTask, status: 'blocked' }} />
    </div>
  ),
}
```

**Storybook rules:**
- Show all visual variants and states
- Use controls for interactive exploration
- Don't test business logic in stories

---

## Vitest Patterns

### Component Behavior

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskCard } from '../TaskCard'

describe('TaskCard', () => {
  it('calls onStatusChange when status button is clicked', async () => {
    const onStatusChange = vi.fn()
    render(<TaskCard task={mockTask} onStatusChange={onStatusChange} />)

    await userEvent.click(screen.getByRole('button', { name: /mark complete/i }))
    expect(onStatusChange).toHaveBeenCalledWith(mockTask.id, 'done')
  })

  it('shows overdue badge for past-due tasks', () => {
    render(<TaskCard task={{ ...mockTask, dueDate: '2024-01-01' }} />)
    expect(screen.getByText(/overdue/i)).toBeInTheDocument()
  })

  it('disables actions when task is completed', () => {
    render(<TaskCard task={{ ...mockTask, status: 'done' }} />)
    expect(screen.getByRole('button', { name: /edit/i })).toBeDisabled()
  })
})
```

### Query Hook Testing

```typescript
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTasks } from '../hooks/useTasks'

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

describe('useTasks', () => {
  it('returns tasks for a project', async () => {
    const { result } = renderHook(() => useTasks('project-1'), { wrapper })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toHaveLength(3)
  })
})
```

### Mock Supabase

```typescript
vi.mock('@/shared/services/supabase/client', () => ({
  createClient: () => ({
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: mockTasks, error: null }),
    })),
  }),
}))
```

### Accessible Queries (Priority Order)

```typescript
// 1. Role queries (best)
screen.getByRole('button', { name: /submit/i })
screen.getByRole('heading', { level: 2 })

// 2. Label queries
screen.getByLabelText(/email/i)

// 3. Text queries
screen.getByText(/no tasks found/i)

// 4. Test ID (last resort)
screen.getByTestId('task-board')
```

**Vitest rules:**
- Test behavior, not implementation
- Use accessible queries
- Mock external dependencies (Supabase, APIs)
- Keep tests fast (< 100ms unit, < 500ms integration)

---

## Playwright Patterns

### Critical User Journey

```typescript
import { test, expect } from '@playwright/test'

test('user creates a task and sees it on the board', async ({ page }) => {
  await page.goto('/dashboard')
  await page.getByRole('button', { name: /new task/i }).click()
  await page.getByLabel(/title/i).fill('Ship feature X')
  await page.getByRole('button', { name: /create/i }).click()

  await expect(page.getByText('Ship feature X')).toBeVisible()
  await expect(page.getByText(/todo/i)).toBeVisible()
})

test('user drags task to done column', async ({ page }) => {
  await page.goto('/tasks')
  const task = page.getByText('Ship feature X')
  const doneColumn = page.getByTestId('column-done')

  await task.dragTo(doneColumn)
  await expect(task).toBeVisible()
})
```

**Playwright rules:**
- Only critical business flows (auth, task CRUD, project management)
- Don't duplicate Vitest tests
- Run against test database

---

## Commands

```bash
# Vitest
npm run test             # Watch mode
npm run test:run         # Single run
npm run test -- --coverage

# Storybook
npm run storybook        # Dev (port 6006)
npm run build-storybook  # Build

# Playwright
npm run test:e2e         # Run E2E
npx playwright test --ui # Debug mode
```

---

## Priority Checklist

### Must Have (MVP)
- [ ] Core UI components have stories
- [ ] Critical flows have E2E tests (auth, task CRUD)
- [ ] Form validation has unit tests
- [ ] Business logic has 60%+ coverage

### Should Have
- [ ] Feature components have stories
- [ ] Error handling tests
- [ ] Accessibility tests

### Nice to Have
- [ ] Visual regression tests
- [ ] Performance tests
- [ ] Browser compatibility

## Related Docs

- Server Actions to test: @docs/api.md
- Data model for mock data: @docs/data-model.md
- Auth flows for E2E: @docs/auth.md
