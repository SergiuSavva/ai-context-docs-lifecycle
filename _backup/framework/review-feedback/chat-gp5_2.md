Got it. I’ll read the core framework docs (`README`, `PRINCIPLES`, `QUICKREF`, `IMPLEMENTATION`, `GLOSSARY`) and then summarize: what this “decision framework” is designed for, which recurring problems it targets, how it solves them (mechanisms/process), and why teams typically need this kind of meta-solution.

[5 tools called]

### What this solution is designed for

This is a **Docs-as-Code methodology**: a repository-native documentation system that works for **humans and AI agents** by making documentation **versioned, structured, and lifecycle-managed** (so it stays trustworthy over time). It’s explicitly meant to make the repo itself the “shared understanding” of the system: **code (does) + reference (is) + specs (next) + rules (how) + decisions (why)**.

### What issues it addresses (the real problems it’s trying to solve)

- **Documentation drift / rot**: docs get written once and then diverge from `main`, becoming worse than useless.
- **No structure / findability**: information spreads across random READMEs, wikis, chat logs, and people’s heads.
- **No workflow integration**: docs are produced “after” implementation, so they’re already outdated and rarely maintained.
- **Repeated re-explanations + onboarding friction**: the same context is explained verbally over and over; new people can’t ramp fast.
- **Re-litigating decisions**: without recorded tradeoffs, teams re-debate choices months later (“why did we do it this way?”).
- **AI unreliability (hallucinations)**: when docs are missing/stale/scattered, AI agents invent structure and behavior assumptions.

### How it solves these issues (mechanisms, not slogans)

- **Docs live with code (same repo, PR-reviewed)**  
  Making docs part of normal code change flow improves accuracy because updates ride along with implementation changes.

- **A clear taxonomy (“Four Pillars”) prevents mixing doc types**
  - **Specs** = *forward-looking* (“what we plan to build”), **ephemeral** (draft → done → archive/collapse)
  - **Reference** = *current reality*, **evergreen** (must match `main`)
  - **Rules** = *how we build here*, **stable/evolving** (prefer enforceable rules)
  - **Decisions (ADRs)** = *why we chose this*, **append-only** (never edit history; supersede with a new ADR)

- **A closed-loop workflow ties docs to delivery**
  The method bakes documentation into the delivery cycle: **Spec → Rules → Implement → PR/CI → Update Reference → ADR if needed → Close spec**.

- **A PR “Definition of Done” gate prevents rot**
  It treats “docs updated when behavior changes” as part of “done,” not optional polish.

- **“Rules over advice” increases consistency**
  The framework pushes teams toward **specific, enforceable** guidance (ideally automated via lint/CI), because vague advice gets ignored—especially by AI.

- **Progressive disclosure keeps docs readable**
  Instead of one giant “architecture bible,” it layers docs from quick entry points to deeper references so people (and AI) can load the right amount of context.

- **Spec archive/collapse prevents “graveyard specs”**
  Completed specs don’t linger as pseudo-current truth; they’re archived or replaced by links to the actual outputs (PR, ADR, updated reference).

### Why we need solutions like this (the “why now”)

- **Software complexity grows faster than team memory**; without a system, knowledge leaks and decisions get re-made.
- **Trust is everything**: once docs are unreliable, people stop reading them; this framework is designed to keep docs *trustworthy by design*.
- **AI changes the stakes**: AI can move fast, but only if it has accurate, well-structured context; otherwise it amplifies wrong assumptions.
- **It reduces total cost of change**: fewer mis-implementations, fewer repeated explanations, faster onboarding, fewer re-debates, and less “tribal knowledge” risk.

If you want, I can also map this framework onto your current repo structure (what you already have vs what’s missing) and suggest the smallest “Level 1 / Level 2” adoption path.