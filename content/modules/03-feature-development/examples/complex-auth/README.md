# Example: OAuth Authentication (Complex Flow)

> **Walkthrough** of the Complex Flow using a real feature example.

---

## Scenario

You're building a workspace app and need to implement user authentication. This requires research (which OAuth provider?), multiple components, and architectural decisions.

**Why Complex Flow?**
- Requires research (evaluating OAuth providers)
- Changes > 5 files
- Architectural decisions needed
- External service integration

---

## Phase 1: Research

First, gather information and evaluate options.

Create `docs/specs/oauth-auth/research.md`:

See: [`research.md`](./research.md)

**What AI does**:
1. Documents 2+ alternatives (Google, GitHub, Auth0)
2. Lists pros/cons for each
3. Creates comparison matrix
4. Makes recommendation with rationale
5. Creates data flow diagram
6. **Asks user to approve** before proceeding

---

## Phase 2: Specification

After research approval, create detailed spec and user stories.

Create `docs/specs/oauth-auth/feature-spec.md`:

See: [`feature-spec.md`](./feature-spec.md)

Create `docs/specs/oauth-auth/user-stories.md`:

See: [`user-stories.md`](./user-stories.md)

**Key elements**:
- Success metrics (measurable)
- Explicit scope boundaries
- User stories with Given/When/Then
- Risks and mitigations

**AI asks user to approve spec** before implementation.

---

## Phase 3: Implementation

Create task breakdown and implement.

Create `docs/specs/oauth-auth/tasks.md`:

See: [`tasks.md`](./tasks.md)

**How AI works**:
1. Groups tasks by category (Setup, Core, Testing, Docs)
2. Works through ONE task at a time
3. Updates tasks.md after each completion
4. Signals completion at milestones

---

## Phase 4: Review & Iterate

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

**Next steps**: Please review. After approval, I will create ADR and update reference docs.
```

Human reviews:
- Tests auth flow end-to-end
- Checks security implementation
- Provides feedback if needed

---

## Phase 5: Documentation

After approval, create permanent documentation.

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
- **Pattern**: Wrap pages with `getServerSession()`

See: `docs/features/auth/README.md`
```

### Update Tech Stack

```markdown
| Auth | NextAuth.js + Google OAuth |
```

---

## Phase 6: Archive

1. Move spec to `docs/specs/_archive/oauth-auth/`
2. Update `docs-index.md` with new links
3. Feature complete!

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

docs/
├── decisions/
│   └── 015-oauth-google.md    # NEW (ADR)
└── features/
    └── auth/
        └── README.md          # NEW
```

---

## Time Spent

- Research: ~2 hours
- Specification: ~1 hour
- Implementation: ~6 hours
- Review + iteration: ~2 hours
- Documentation: ~1 hour
- **Total**: ~12 hours (2 days)

---

## Lessons

1. **Research prevents rework** - Evaluated options upfront, no switching mid-implementation
2. **User stories clarify acceptance** - Given/When/Then made testing straightforward
3. **ADR preserves context** - Future devs know WHY Google was chosen
4. **AGENTS.md update is mandatory** - AI agents now know how auth works
5. **Complex Flow has checkpoints** - Human approval at research, spec, and completion
