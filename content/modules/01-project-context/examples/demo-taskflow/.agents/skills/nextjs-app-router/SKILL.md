---
name: nextjs-app-router
description: Next.js 15 App Router patterns — pages, layouts, server components, server actions, streaming, and middleware. Use when building or editing pages, layouts, routes, or server actions.
---

# Next.js 15 App Router

> **References:** Architecture overview → @docs/architecture.md | Server Actions catalog → @docs/api.md | Auth middleware → @docs/auth.md

## File Conventions

| File | Purpose | Component Type |
|------|---------|----------------|
| `layout.tsx` | Shared UI, providers | Server (default) |
| `page.tsx` | Route UI | Server (default) |
| `loading.tsx` | Loading UI (Suspense) | Server |
| `error.tsx` | Error boundary | **Client** (required) |
| `not-found.tsx` | 404 UI | Server |
| `route.ts` | API endpoint | N/A |

---

## Async Params (Breaking Change)

In Next.js 15, `params` and `searchParams` are Promises.

```typescript
// ✅ Correct — await params
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <TaskDetail id={id} />
}

// ✅ With searchParams
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ projectId: string }>
  searchParams: Promise<{ status?: string }>
}) {
  const [{ projectId }, { status }] = await Promise.all([params, searchParams])
  return <TaskList projectId={projectId} status={status} />
}
```

---

## Server vs Client Components

### Server Component (Default)

```typescript
// No directive needed
import { getTasks } from '@/features/tasks/actions'

export default async function TasksPage() {
  const tasks = await getTasks()
  return <TaskBoard tasks={tasks} />
}
```

### Client Component (When Needed)

```typescript
'use client'
import { useState } from 'react'

export function TaskFilter({ onFilter }: { onFilter: (status: string) => void }) {
  const [status, setStatus] = useState('all')
  // ... interactive UI
}
```

**Use Client Components for:** `useState`, `useEffect`, event handlers, browser APIs, third-party hooks.

---

## Data Fetching

### Server Component (Preferred)

```typescript
export default async function Page() {
  // Parallel fetching
  const [tasks, project] = await Promise.all([
    getTasks(projectId),
    getProject(projectId),
  ])
  return <Dashboard tasks={tasks} project={project} />
}
```

### Streaming with Suspense

```typescript
import { Suspense } from 'react'

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<TasksSkeleton />}>
        <TaskList />
      </Suspense>
      <Suspense fallback={<StatsSkeleton />}>
        <StatsPanel />
      </Suspense>
    </div>
  )
}
```

---

## Server Actions

### Define

```typescript
// features/tasks/actions/index.ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createTask(formData: FormData) {
  const title = formData.get('title') as string
  if (!title) return { error: 'Title is required' }

  const task = await db.tasks.create({ title })
  revalidatePath('/tasks')
  redirect(`/tasks/${task.id}`)
}

export async function updateTaskStatus(id: string, status: string) {
  await db.tasks.update(id, { status })
  revalidatePath('/tasks')
}
```

### Use in Forms

```typescript
// Server Component form
import { createTask } from '@/features/tasks/actions'

export default function NewTaskPage() {
  return (
    <form action={createTask}>
      <input name="title" required />
      <SubmitButton />
    </form>
  )
}

// Client Component for pending state
'use client'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()
  return <button disabled={pending}>{pending ? 'Creating...' : 'Create'}</button>
}
```

### Use with useActionState

```typescript
'use client'
import { useActionState } from 'react'
import { createTask } from '@/features/tasks/actions'

export function CreateTaskForm() {
  const [state, action, isPending] = useActionState(createTask, null)
  return (
    <form action={action}>
      <input name="title" />
      {state?.error && <p className="text-destructive">{state.error}</p>}
      <button disabled={isPending}>{isPending ? 'Creating...' : 'Create'}</button>
    </form>
  )
}
```

---

## Error Boundary

```typescript
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="text-muted-foreground">{error.message}</p>
      <button onClick={reset} className="btn-primary">Try again</button>
    </div>
  )
}
```

---

## Middleware

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { updateSession } from '@/shared/services/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request)

  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/tasks/:path*', '/projects/:path*'],
}
```

---

## Metadata

```typescript
import type { Metadata } from 'next'

// Static
export const metadata: Metadata = {
  title: 'Tasks | TaskFlow',
  description: 'Manage your team tasks',
}

// Dynamic
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const project = await getProject(id)
  return { title: `${project.name} | TaskFlow` }
}
```

---

## Quick Checklist

- [ ] Server Components by default (@docs/decisions/001-server-first.md)
- [ ] `await params` in dynamic routes
- [ ] Suspense boundaries for streaming
- [ ] Server Actions for mutations (@docs/api.md)
- [ ] `revalidatePath` / `revalidateTag` after mutations
- [ ] `error.tsx` as client component
- [ ] `loading.tsx` for route loading states
- [ ] `@/` path aliases for imports
- [ ] Parallel data fetching with `Promise.all`

## Related Docs

- Architecture & dependency rules: @docs/architecture.md
- Server Actions catalog: @docs/api.md
- Auth flows & middleware: @docs/auth.md
- Server-first ADR: @docs/decisions/001-server-first.md
