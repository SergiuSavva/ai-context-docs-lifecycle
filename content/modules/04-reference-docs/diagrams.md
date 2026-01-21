# Diagrams with Mermaid

> **Docs as code** - Diagrams in markdown that version with your code.

---

## Why Mermaid?

- **Version controlled**: Diagrams are text, tracked in Git
- **No external tools**: Renders in GitHub, VS Code, most markdown viewers
- **Easy to update**: Change text, not image files
- **AI-friendly**: AI agents can read and modify

---

## Common Diagram Types

### 1. Flowchart - Processes & Decisions

Use for: User flows, decision trees, processes

```mermaid
flowchart TD
    A[Start] --> B{Is user logged in?}
    B -->|Yes| C[Show Dashboard]
    B -->|No| D[Show Login]
    D --> E[User logs in]
    E --> C
```

**Syntax**:
```
flowchart TD
    A[Rectangle] --> B{Diamond}
    B -->|Label| C[Next]
```

- `TD` = Top to Down, `LR` = Left to Right
- `[text]` = Rectangle
- `{text}` = Diamond (decision)
- `-->|label|` = Arrow with label

---

### 2. Sequence Diagram - Interactions

Use for: API flows, system interactions, auth flows

```mermaid
sequenceDiagram
    participant User
    participant App
    participant API
    participant DB

    User->>App: Click Submit
    App->>API: POST /data
    API->>DB: INSERT
    DB-->>API: Success
    API-->>App: 200 OK
    App-->>User: Show confirmation
```

**Syntax**:
```
sequenceDiagram
    participant A
    participant B
    
    A->>B: Solid arrow (request)
    B-->>A: Dashed arrow (response)
    A->>+B: Activate B
    B-->>-A: Deactivate B
```

---

### 3. Entity Relationship - Data Models

Use for: Database schema, data relationships

```mermaid
erDiagram
    USER ||--o{ BOOKING : makes
    USER {
        string id PK
        string email
        string name
    }
    SPACE ||--o{ BOOKING : has
    SPACE {
        string id PK
        string name
        int capacity
    }
    BOOKING {
        string id PK
        string userId FK
        string spaceId FK
        date startTime
        date endTime
    }
```

**Syntax**:
```
erDiagram
    ENTITY1 ||--o{ ENTITY2 : relationship
    ENTITY1 {
        type name
    }
```

Relationship symbols:
- `||` = exactly one
- `o{` = zero or more
- `|{` = one or more

---

### 4. State Diagram - Object States

Use for: Order status, task states, workflow states

```mermaid
stateDiagram-v2
    [*] --> Pending
    Pending --> InProgress: Start
    InProgress --> Completed: Finish
    InProgress --> Blocked: Block
    Blocked --> InProgress: Unblock
    Completed --> [*]
```

**Syntax**:
```
stateDiagram-v2
    [*] --> State1
    State1 --> State2: transition
    State2 --> [*]
```

---

### 5. Architecture - System Components

Use for: System overview, component relationships

```mermaid
flowchart TB
    subgraph Frontend
        Web[Next.js App]
        Mobile[React Native]
    end
    
    subgraph Backend
        API[API Server]
        Worker[Background Jobs]
    end
    
    subgraph Data
        DB[(PostgreSQL)]
        Cache[(Redis)]
    end
    
    Web --> API
    Mobile --> API
    API --> DB
    API --> Cache
    Worker --> DB
```

---

## Best Practices

### Keep It Simple

```mermaid
flowchart LR
    A --> B --> C
```

Not:

```mermaid
flowchart LR
    A[Very Long Component Name With Details] --> B[Another Very Long Name] --> C[Yet Another]
```

### Use Subgraphs for Grouping

```mermaid
flowchart TB
    subgraph client [Client]
        A[Browser]
    end
    subgraph server [Server]
        B[API]
        C[DB]
    end
    A --> B --> C
```

### Add Labels to Clarify

```mermaid
sequenceDiagram
    User->>API: POST /login
    Note right of API: Validate credentials
    API-->>User: JWT token
```

---

## When to Use Diagrams

| Scenario | Diagram Type |
|----------|--------------|
| User authentication flow | Sequence |
| Order state machine | State |
| Database schema | ER Diagram |
| System architecture | Flowchart with subgraphs |
| Decision process | Flowchart |
| API request/response | Sequence |

---

## Embedding in Docs

In markdown files:

````markdown
## System Architecture

```mermaid
flowchart LR
    User --> API --> DB
```
````

The diagram renders automatically in GitHub, VS Code (with extension), and most documentation sites.

---

## AI Agent Instructions

When creating diagrams:

1. **Match diagram type to content** - Don't force-fit
2. **Keep nodes short** - 1-3 words per node
3. **Use subgraphs** - For logical grouping
4. **Add labels** - When relationships need explanation
5. **Test rendering** - Preview before committing
