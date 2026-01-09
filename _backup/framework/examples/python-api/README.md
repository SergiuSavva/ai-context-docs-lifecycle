# Example: Python API Project Setup

> A concrete example of the framework applied to a Python FastAPI project.

---

## Directory Structure

```
my-python-api/
├── src/
│   ├── main.py                   # Application entry
│   ├── config.py                 # Configuration
│   ├── models/                   # SQLAlchemy models
│   ├── schemas/                  # Pydantic schemas
│   ├── routers/                  # API routes
│   ├── services/                 # Business logic
│   └── utils/                    # Utilities
│
├── tests/                        # Tests
│   ├── conftest.py
│   ├── test_[module].py
│   └── ...
│
├── migrations/                   # Alembic migrations
│
├── docs/                         # Documentation ← Framework
│   ├── reference/
│   │   ├── architecture.md
│   │   ├── code-map.md
│   │   └── data-model.md
│   ├── specs/
│   │   └── YYYY-MM-DD-feature/
│   ├── decisions/
│   │   └── ADR-001-*.md
│   └── _archive/
│
├── .cursor/rules/                # AI rules
│   ├── project.mdc
│   ├── python-patterns.mdc
│   └── api-design.mdc
│
├── pyproject.toml
├── requirements.txt
└── docker-compose.yml
```

---

## Example: code-map.md

```markdown
# Code Map

> Last Updated: 2025-01-02

## Entry Points

| Path | Purpose | When to Start Here |
|------|---------|-------------------|
| `src/main.py` | FastAPI app | Understanding app bootstrap |
| `src/routers/` | API endpoints | Adding new routes |
| `src/config.py` | Settings | Changing configuration |
| `migrations/` | DB migrations | Schema changes |

## Directory Structure

\`\`\`
src/
├── main.py              # FastAPI application, router mounting
├── config.py            # Pydantic settings, env vars
├── dependencies.py      # Dependency injection
│
├── models/              # SQLAlchemy ORM models
│   ├── base.py         # Base model class
│   ├── user.py         # User model
│   └── [entity].py
│
├── schemas/             # Pydantic request/response schemas
│   ├── user.py         # User schemas
│   └── [entity].py
│
├── routers/             # API route handlers
│   ├── users.py        # /users routes
│   └── [entity].py
│
├── services/            # Business logic layer
│   ├── user_service.py
│   └── [service].py
│
└── utils/               # Shared utilities
    ├── security.py     # Auth helpers
    └── [util].py
\`\`\`

## Key Modules

### routers/

**Purpose**: API endpoint definitions

**Pattern**: One file per resource, dependency injection for services.

\`\`\`python
# routers/users.py
from fastapi import APIRouter, Depends
from src.services.user_service import UserService
from src.schemas.user import UserCreate, UserResponse

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/", response_model=UserResponse)
async def create_user(
    user: UserCreate,
    service: UserService = Depends()
):
    return await service.create(user)
\`\`\`

### services/

**Purpose**: Business logic, separated from HTTP concerns

**Key Files**:
| File | Purpose |
|------|---------|
| `user_service.py` | User CRUD + business rules |
| `auth_service.py` | Authentication logic |

## Quick Find

| Looking For | Location |
|-------------|----------|
| Add API endpoint | `src/routers/[resource].py` |
| Add database model | `src/models/[entity].py` |
| Add validation | `src/schemas/[entity].py` |
| Business logic | `src/services/[service].py` |
| Tests | `tests/test_[module].py` |
| Config/env vars | `src/config.py` |
```

---

## Example: project.mdc

```markdown
---
description: Python API project rules for AI assistants
globs:
  - "**/*.py"
---

# MyAPI - AI Agent Rules

## Project Context

**What**: A RESTful API for [description] built with FastAPI.

**Tech Stack**:
- Framework: FastAPI
- Database: PostgreSQL + SQLAlchemy
- Validation: Pydantic v2
- Testing: pytest + httpx
- Auth: JWT tokens

## Quick Start

\`\`\`bash
# Setup
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Database
docker-compose up -d postgres
alembic upgrade head

# Run
uvicorn src.main:app --reload

# Test
pytest
\`\`\`

## Critical Rules

### Type Hints - ALWAYS

\`\`\`python
# ✅ CORRECT - Full type hints
def get_user(user_id: int) -> User | None:
    ...

# ❌ WRONG - No type hints
def get_user(user_id):
    ...
\`\`\`

### Async by Default

\`\`\`python
# ✅ CORRECT - Async functions
async def get_users() -> list[User]:
    ...

# ❌ WRONG - Sync in async context
def get_users() -> list[User]:  # blocks event loop
    ...
\`\`\`

### Pydantic for Validation

\`\`\`python
# ✅ CORRECT - Pydantic schemas
from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr
    name: str
    
    model_config = ConfigDict(str_strip_whitespace=True)

# ❌ WRONG - Dict validation
def create_user(data: dict):  # no validation
    ...
\`\`\`

### Dependency Injection

\`\`\`python
# ✅ CORRECT - Use Depends()
@router.get("/users/{id}")
async def get_user(
    id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    ...

# ❌ WRONG - Global state
@router.get("/users/{id}")
async def get_user(id: int):
    db = global_db  # hard to test
    ...
\`\`\`

## File Patterns

### Router Pattern

\`\`\`python
# src/routers/users.py
from fastapi import APIRouter, Depends, HTTPException, status
from src.schemas.user import UserCreate, UserResponse, UserUpdate
from src.services.user_service import UserService

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(data: UserCreate, service: UserService = Depends()):
    return await service.create(data)

@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, service: UserService = Depends()):
    user = await service.get_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
\`\`\`

### Service Pattern

\`\`\`python
# src/services/user_service.py
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends
from src.models.user import User
from src.schemas.user import UserCreate

class UserService:
    def __init__(self, db: AsyncSession = Depends(get_db)):
        self.db = db
    
    async def create(self, data: UserCreate) -> User:
        user = User(**data.model_dump())
        self.db.add(user)
        await self.db.commit()
        await self.db.refresh(user)
        return user
\`\`\`

### Schema Pattern

\`\`\`python
# src/schemas/user.py
from pydantic import BaseModel, EmailStr, ConfigDict
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    email: EmailStr | None = None
    name: str | None = None

class UserResponse(UserBase):
    id: int
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)
\`\`\`

## Testing

\`\`\`python
# tests/test_users.py
import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_create_user(client: AsyncClient):
    response = await client.post("/users/", json={
        "email": "test@example.com",
        "name": "Test User",
        "password": "secret123"
    })
    assert response.status_code == 201
    assert response.json()["email"] == "test@example.com"
\`\`\`

## Error Handling

\`\`\`python
# ✅ Use HTTPException with appropriate status codes
from fastapi import HTTPException, status

raise HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail="Resource not found"
)

# For validation errors, let Pydantic handle it (422 automatic)
\`\`\`

## Current Work

**Active Spec**: `docs/specs/2025-01-02-user-auth/spec.md`

## Resources

- Code map: `docs/reference/code-map.md`
- API docs: http://localhost:8000/docs (Swagger UI)
```

---

## Example: Spec

`docs/specs/2025-01-02-user-auth/spec.md`:

```markdown
# User Authentication

> **Status**: In Progress
> **Owner**: Backend Team
> **Created**: 2025-01-02

## Why

Users need to securely authenticate to access protected resources.

## What

### In Scope
- [ ] POST /auth/register - User registration
- [ ] POST /auth/login - Get JWT token
- [ ] POST /auth/refresh - Refresh token
- [ ] GET /auth/me - Get current user
- [ ] Password hashing with bcrypt

### Out of Scope
- OAuth providers (future)
- Email verification (separate spec)
- Password reset (separate spec)

## Acceptance Criteria

- [ ] **AC1**: Registration creates user with hashed password
- [ ] **AC2**: Login returns JWT access + refresh tokens
- [ ] **AC3**: Protected routes return 401 without valid token
- [ ] **AC4**: Refresh endpoint issues new access token
- [ ] **AC5**: Tokens expire appropriately (access: 15min, refresh: 7days)

## Technical Approach

### Key Files
- `src/routers/auth.py` - Auth endpoints
- `src/services/auth_service.py` - Auth logic
- `src/utils/security.py` - JWT + password utilities
- `src/schemas/auth.py` - Auth request/response schemas

### Dependencies
- `python-jose[cryptography]` - JWT handling
- `passlib[bcrypt]` - Password hashing

## Doc Impact

- [ ] Update `code-map.md` with auth module
- [ ] ADR for JWT strategy

## Tasks

- [ ] T1: Add auth dependencies to requirements.txt
- [ ] T2: Create security utilities (JWT, password)
- [ ] T3: Create auth schemas
- [ ] T4: Create auth service
- [ ] T5: Create auth router
- [ ] T6: Add auth dependency for protected routes
- [ ] T7: Write tests
```

---

## Adapting to Your Stack

This example uses FastAPI, but the framework works with any Python stack:

- **Django**: Replace routers with views, services with managers
- **Flask**: Replace routers with blueprints
- **Generic**: Adjust file patterns to your conventions

The principles remain the same:
1. Document current structure in `code-map.md`
2. Write specs before implementing
3. Capture patterns in rules
4. Record decisions in ADRs

