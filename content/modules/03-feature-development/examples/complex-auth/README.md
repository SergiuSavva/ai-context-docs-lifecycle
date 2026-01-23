# Example: OAuth Authentication (Complex Feature)

> **Walkthrough** of a complex feature using the three-phase approach with all optional docs.

---

## Scenario

You're building a workspace app and need to implement user authentication. This requires research (which OAuth provider?), multiple components, and architectural decisions.

**Why this is complex**:
- Requires research (evaluating OAuth providers)
- Architectural decisions needed
- External service integration
- Multiple components and integrations

**Docs needed**: All of them
- `research.md` - evaluate options
- `spec.md` - what to build
- `design.md` - architecture (optional, covered in research here)
- `user-stories.md` - test scenarios
- `tasks.md` - implementation checklist
- ADR - after completion

---

## Phase 1: Research

First, gather information and evaluate options.

Create `specs/oauth-auth/research.md`:

See: [`research.md`](./research.md)

**What AI does**:
1. Documents 2+ alternatives (Google, GitHub, Auth0)
2. Lists pros/cons for each
3. Creates comparison matrix
4. Makes recommendation with rationale
5. Creates data flow diagram
6. **Validates with user** before proceeding

---

## Phase 2: Plan

After research approval, create spec and supporting docs.

### Create spec.md

Create `specs/oauth-auth/spec.md`:

See: [`spec.md`](./spec.md)

### Create user-stories.md

Create `specs/oauth-auth/user-stories.md`:

See: [`user-stories.md`](./user-stories.md)

### Create tasks.md

Create `specs/oauth-auth/tasks.md`:

See: [`tasks.md`](./tasks.md)

**AI validates plan with user** before implementing.

---

## Phase 3: Implement

AI works through tasks:

1. Groups tasks by category (Setup, Core, Testing, Docs)
2. Works through ONE task at a time
3. Updates tasks.md after each completion
4. Signals completion at milestones

---

## Completion

AI signals ready for review:

```
Ready for review. Implementation complete.

**DoD Checklist**:
- [x] All tasks completed (22/22)
- [x] All acceptance criteria verified
- [x] Tests passing
- [ ] ADR needed: Yes (chose Google OAuth over alternatives)
- [ ] AGENTS.md updates needed: Key Patterns, Tech Stack
- [ ] Human review needed

**Key Decisions Made**:
- Google OAuth over GitHub/Auth0 (see research.md)
- NextAuth.js for implementation
- Database sessions over JWT

**Next steps**: Please review. After approval, I will create ADR.
```

---

## After Approval

### Create ADR

See: [`adr.md`](./adr.md)

**ADR captures**:
- Why Google OAuth was chosen
- What alternatives were rejected
- Trade-offs accepted

### Update AGENTS.md

```markdown
## Authentication
- **Provider**: Google OAuth 2.0 via NextAuth.js
- **Session**: Database sessions (Prisma)
- **Protected routes**: Middleware in `middleware.ts`
```

### Delete spec folder

`specs/oauth-auth/` → deleted (knowledge now in ADR + AGENTS.md)

---

## Files Changed

```
src/
├── app/
│   ├── api/auth/[...nextauth]/
│   │   └── route.ts           # NEW
│   ├── (protected)/
│   │   └── dashboard/
│   │       └── page.tsx       # NEW
│   └── login/
│       └── page.tsx           # NEW
├── components/
│   ├── LoginButton.tsx        # NEW
│   ├── LogoutButton.tsx       # NEW
│   └── UserAvatar.tsx         # NEW
├── lib/
│   └── auth.ts                # NEW
├── middleware.ts              # NEW
└── prisma/
    └── schema.prisma          # MODIFIED

decisions/
└── 015-oauth-google.md        # NEW (ADR)
```

---

## Lessons

1. **Research prevents rework** - Evaluated options upfront, no switching mid-implementation
2. **User stories clarify acceptance** - Given/When/Then made testing straightforward
3. **ADR preserves context** - Future devs know WHY Google was chosen
4. **Spec is ephemeral** - Deleted after feature complete, knowledge lives in ADR
