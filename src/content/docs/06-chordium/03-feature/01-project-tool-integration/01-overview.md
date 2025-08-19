---
title: Project Tool Integration Overview
description: Connect your LENS Project Module with your Developer Machine using Chordium CLI.
---

The **Project Tool Integration** feature in Chordium is designed to seamlessly connect your LENS Project Module with a developer’s local machine.  
This ensures that tasks, stories, and project context flow directly into the developer’s workflow without requiring manual setup.

---

### Step 1: Link LENS Projects to Developer Machines (via Chordium CLI)

Using the Chordium CLI (`lenscloud`), developers can link their local environment with the LENS Project Module.

**What this enables:**

- Fetch assigned tasks and stories directly in the terminal  
- Automatically associate branches and commits with product work items  
- Sync multiple projects locally without manual configuration  

**Benefits:**

- No need to switch between project management tools and Git manually  
- Faster onboarding for new developers  
- Developers stay focused on building, not setup  

---

### How It Works Together

```text
   [LENS Project Module] ───▶ [Developer Machine via Chordium CLI]
           ▲                                  │
           │                                  ▼
   Stories, Tasks ◀──── Context-aware Branches, Commits ◀── Developers
