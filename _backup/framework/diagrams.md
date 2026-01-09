# Documentation Workflow Diagrams

> Mermaid diagrams visualizing the docs-as-code methodology.

---

## 1. Document Lifecycle (Four Pillars)

Each document type follows a distinct lifecycle pattern:

```mermaid
flowchart TB
    subgraph SPECS["📋 SPECS (Ephemeral)"]
        direction LR
        S1[Draft] --> S2[In Progress]
        S2 --> S3[Done]
        S3 --> S4[Archived]
    end

    subgraph REFERENCE["📚 REFERENCE (Evergreen)"]
        direction LR
        R1[Create] --> R2[Update]
        R2 --> R2
        R2 -.-> R3[Deprecate]
    end

    subgraph RULES["⚙️ RULES (Stable)"]
        direction LR
        U1[Create] --> U2[Evolve]
        U2 --> U2
    end

    subgraph DECISIONS["📝 DECISIONS (Append-only)"]
        direction LR
        D1[Create] --> D2[Supersede]
        D2 --> D1
    end

    %% Cross-pillar relationships
    S3 ==> R2
    S2 -.-> U2
    R2 -.-> D1

    %% Styling
    style SPECS fill:#fff3e0,stroke:#e65100,stroke-width:2px
    style REFERENCE fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
    style RULES fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style DECISIONS fill:#fce4ec,stroke:#c2185b,stroke-width:2px
```

### Lifecycle Summary

| Type | Lifecycle | Update Rule |
|------|-----------|-------------|
| **Specs** | Draft → In Progress → Done → Archive | Archive after merge |
| **Reference** | Create → Update → (Deprecate) | Update when behavior changes |
| **Rules** | Create → Evolve | Update as patterns emerge |
| **Decisions** | Create → (Supersede) | Never edit, only add new |

---

## 2. Spec Lifecycle Detail

The ephemeral nature of specs - they guide work, then disappear:

```mermaid
stateDiagram-v2
    [*] --> Draft: Human writes spec

    Draft --> InProgress: AI/Human starts work
    InProgress --> Done: Implementation complete
    Done --> Archived: After merge

    Draft: Define change scope
    Draft: Set acceptance criteria
    Draft: Identify doc impact

    InProgress: Apply rules
    InProgress: Write code + tests
    InProgress: Run local checks

    Done: All criteria met
    Done: PR approved
    Done: CI green

    Archived: Moved to _archive/
    Archived: Or collapsed to links

    Archived --> [*]
```

---

## 3. AI Agent & Human Collaboration

How AI and humans work together through the docs-as-code workflow:

```mermaid
flowchart TD
    subgraph HUMAN["👤 HUMAN"]
        H1[Write Spec]
        H2[Review Changes]
        H3[Approve PR]
        H4[Close Spec]
    end

    subgraph AI["🤖 AI AGENT"]
        A1[Read Context]
        A2[Plan Changes]
        A3[Implement]
        A4[Update Docs]
    end

    subgraph DOCS["📄 DOCUMENTATION"]
        D1[Spec]
        D2[Rules]
        D3[Reference]
        D4[ADRs]
    end

    %% Human creates spec
    H1 --> D1

    %% AI reads all context
    D1 --> A1
    D2 --> A1
    D3 --> A1
    D4 --> A1

    %% AI works
    A1 --> A2
    A2 --> A3
    A3 --> A4

    %% AI updates docs
    A4 --> D3
    A4 -.-> D4

    %% Human reviews
    A3 --> H2
    A4 --> H2
    H2 --> H3

    %% Completion
    H3 --> H4
    H4 --> D1

    %% Styling
    style HUMAN fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    style AI fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    style DOCS fill:#fff8e1,stroke:#ff8f00,stroke-width:2px
```

---

## 4. The 7-Step Workflow Loop

The complete development cycle from spec to completion:

```mermaid
flowchart LR
    subgraph "1️⃣ SPEC"
        S[Define Change]
    end

    subgraph "2️⃣ RULES"
        R[Apply Patterns]
    end

    subgraph "3️⃣ IMPLEMENT"
        I[Code + Tests]
    end

    subgraph "4️⃣ REVIEW"
        V[PR + CI]
    end

    subgraph "5️⃣ DECIDE"
        D[ADR if needed]
    end

    subgraph "6️⃣ UPDATE"
        U[Reference Docs]
    end

    subgraph "7️⃣ CLOSE"
        C[Archive Spec]
    end

    S --> R --> I --> V --> D --> U --> C
    C -.-> S

    style S fill:#fff3e0,stroke:#e65100
    style R fill:#e3f2fd,stroke:#1565c0
    style I fill:#f3e5f5,stroke:#7b1fa2
    style V fill:#e8f5e9,stroke:#2e7d32
    style D fill:#fce4ec,stroke:#c2185b
    style U fill:#e0f7fa,stroke:#00838f
    style C fill:#f5f5f5,stroke:#616161
```

---

## 5. AI Agent Reading Order

What an AI agent should read before starting work:

```mermaid
flowchart LR
    subgraph "READ ORDER"
        direction TB
        R1["1. Current Spec<br/>What to build"]
        R2["2. Relevant Rules<br/>How to build"]
        R3["3. Reference Docs<br/>Current state"]
        R4["4. Related ADRs<br/>Past decisions"]
    end

    R1 --> R2 --> R3 --> R4

    subgraph "THEN"
        direction TB
        T1[Plan Files to Change]
        T2[List Tests to Add]
        T3[Note Docs to Update]
    end

    R4 --> T1
    T1 --> T2
    T2 --> T3

    style R1 fill:#fff3e0,stroke:#e65100
    style R2 fill:#e3f2fd,stroke:#1565c0
    style R3 fill:#e8f5e9,stroke:#2e7d32
    style R4 fill:#fce4ec,stroke:#c2185b
```

---

## 6. Document Dependencies

How information flows between document types:

```mermaid
flowchart TD
    subgraph INPUTS["📥 INPUTS"]
        I1[Requirements]
        I2[User Stories]
        I3[Constraints]
    end

    subgraph PILLARS["📑 FOUR PILLARS"]
        P1[Specs<br/>What to build]
        P2[Rules<br/>How to build]
        P3[Reference<br/>What exists]
        P4[Decisions<br/>Why chosen]
    end

    subgraph OUTPUTS["📤 OUTPUTS"]
        O1[Working Code]
        O2[Current Docs]
        O3[Knowledge Base]
    end

    %% Input flows
    I1 --> P1
    I2 --> P1
    I3 --> P2

    %% Pillar interactions
    P1 --> O1
    P2 --> O1
    P2 --> P4
    O1 --> P3
    O1 --> P4

    %% Output flows
    P3 --> O2
    P4 --> O2
    P3 --> O3
    P4 --> O3

    %% Feedback loops
    P3 -.->|informs| P1
    P4 -.->|guides| P2
    O3 -.->|knowledge| P1

    %% Styling
    style INPUTS fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style PILLARS fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    style OUTPUTS fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
```

---

## 7. Definition of Done (PR Gate)

Visual checklist for completing work:

```mermaid
flowchart LR
    subgraph CHECKLIST["✅ PR GATE CHECKLIST"]
        direction TB
        C1["☐ Spec criteria met"]
        C2["☐ Tests pass"]
        C3["☐ CI green"]
        C4["☐ Reference updated"]
        C5["☐ ADR added (if needed)"]
        C6["☐ Spec closed"]
    end

    START([PR Ready]) --> C1
    C1 --> C2
    C2 --> C3
    C3 --> C4
    C4 --> C5
    C5 --> C6
    C6 --> DONE([Merge])

    style START fill:#fff3e0,stroke:#e65100
    style DONE fill:#e8f5e9,stroke:#2e7d32
    style CHECKLIST fill:#fafafa,stroke:#9e9e9e,stroke-width:2px
```

---

## Quick Reference

| Diagram | Purpose |
|---------|---------|
| 1. Four Pillars | Overview of all document types and lifecycles |
| 2. Spec Detail | Detailed spec state transitions |
| 3. AI & Human | Collaboration model between AI and human |
| 4. 7-Step Loop | Complete workflow from spec to close |
| 5. Reading Order | What AI should read before starting |
| 6. Dependencies | How information flows between docs |
| 7. PR Gate | Definition of Done checklist |
