---
name: database
description: Supabase integration — client setup, migrations, RLS policies, auth, storage, and React Query patterns. Use when working with database queries, authentication, file storage, or writing migrations.
---

# Supabase Integration

> **References:** Data model & schema → @docs/data-model.md | Auth flows → @docs/auth.md | React Query ADR → @docs/decisions/002-react-query.md

## Client Usage

| Context | Import | Await? |
|---------|--------|--------|
| Client Components | `@/shared/services/supabase/client` | No |
| Server Components / Actions / API | `@/shared/services/supabase/server` | **Yes** |

```typescript
// Client Component
'use client'
import { createClient } from '@/shared/services/supabase/client'
const supabase = createClient() // Sync

// Server Component / Action
import { createClient } from '@/shared/services/supabase/server'
const supabase = await createClient() // Must await!
```

**Critical rules:**
- Server client: always `await createClient()`
- Never store client in a global variable
- Create a new client per request

---

## Types

```bash
npm run db:types   # Run after ANY schema change
```

```typescript
import type { Tables, TablesInsert, TablesUpdate } from '@/shared/services/supabase/types'

type Task = Tables<'tasks'>
type TaskInsert = TablesInsert<'tasks'>
type TaskUpdate = TablesUpdate<'tasks'>
```

**Workflow:** Schema change → `db:migrate` → `db:types` → Update code

---

## Migrations

### Structure

```
supabase/migrations/
├── 00000000000001_extensions.sql
├── 00000000000002_core_tables.sql
├── 00000000000003_functions.sql
├── 00000000000004_rls_policies.sql
└── 00000000000005_indexes.sql
```

### Template

```sql
-- Migration: [describe what this does]
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'todo',
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  assignee_id UUID REFERENCES auth.users(id),
  created_by UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_project_member" ON public.tasks
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.project_members pm
      WHERE pm.project_id = tasks.project_id
        AND pm.user_id = (SELECT auth.uid())
    )
  );

CREATE INDEX idx_tasks_project ON public.tasks(project_id);
CREATE INDEX idx_tasks_assignee ON public.tasks(assignee_id);
```

### Rules

| Don't | Do |
|-------|-----|
| Edit existing migrations | Create new migration |
| Skip RLS policies | Add policies with every table |
| Skip indexes | Add indexes for foreign keys and filters |
| Use `auth.uid()` in RLS | Use `(SELECT auth.uid())` for performance |

### Commands

```bash
npm run db:new <name>    # Create migration
npm run db:migrate       # Apply migrations
npm run db:reset         # Reset + migrate + seed (dev)
npm run db:types         # Generate TypeScript types
```

---

## RLS Patterns

### Owner Access

```sql
CREATE POLICY "own_tasks" ON public.tasks
  FOR ALL TO authenticated
  USING (created_by = (SELECT auth.uid()))
  WITH CHECK (created_by = (SELECT auth.uid()));
```

### Project Member Access

```sql
CREATE POLICY "project_member_select" ON public.tasks
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.project_members pm
      WHERE pm.project_id = tasks.project_id
        AND pm.user_id = (SELECT auth.uid())
    )
  );
```

### Admin Override

```sql
CREATE POLICY "admin_all" ON public.tasks
  FOR ALL TO authenticated
  USING ((SELECT auth.jwt()) ->> 'role' = 'admin');
```

---

## React Query Integration

### Query Keys

```typescript
export const queryKeys = {
  tasks: {
    all: ['tasks'] as const,
    list: (projectId: string, filters?: object) =>
      ['tasks', 'list', projectId, filters] as const,
    detail: (id: string) => ['tasks', 'detail', id] as const,
  },
  projects: {
    all: ['projects'] as const,
    list: () => ['projects', 'list'] as const,
    detail: (id: string) => ['projects', 'detail', id] as const,
  },
}
```

### Query Hook

```typescript
export function useTasks(projectId: string) {
  const supabase = createClient()

  return useQuery({
    queryKey: queryKeys.tasks.list(projectId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*, assignee:profiles(*)')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false })

      if (error) throw new Error(error.message)
      return data
    },
    staleTime: 2 * 60 * 1000,
  })
}
```

### Mutation with Optimistic Update

```typescript
export function useUpdateTaskStatus() {
  const queryClient = useQueryClient()
  const supabase = createClient()

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('tasks')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)

      if (error) throw new Error(error.message)
    },
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.tasks.all })
      // Optimistic update logic...
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all })
    },
  })
}
```

---

## Authentication

### Server Action (Preferred)

```typescript
'use server'
import { createClient } from '@/shared/services/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function signIn(formData: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) redirect('/auth/error')
  revalidatePath('/', 'layout')
  redirect('/dashboard')
}
```

---

## Storage

```typescript
// Upload file
await supabase.storage
  .from('attachments')
  .upload(`${taskId}/${filename}`, file, { cacheControl: '3600', upsert: false })

// Get public URL
const { data: { publicUrl } } = supabase.storage
  .from('attachments')
  .getPublicUrl(`${taskId}/${filename}`)
```

---

## Anti-Patterns

| Wrong | Correct |
|-------|---------|
| `createClient()` on server (missing await) | `await createClient()` |
| Global `const supabase = ...` | Create per-request |
| `useEffect` + direct query | React Query hooks (@docs/decisions/002-react-query.md) |
| `auth.uid()` in RLS | `(SELECT auth.uid())` |
| Skip `db:types` after migration | Always regenerate |

## Related Docs

- Data model & ERD: @docs/data-model.md
- Auth flow & middleware: @docs/auth.md
- Server Actions catalog: @docs/api.md
- React Query decision: @docs/decisions/002-react-query.md
