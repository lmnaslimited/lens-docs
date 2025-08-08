---
title: Project Tool Integration Overview
description: Integrate your Project Management Tool with Chordium.
---

The **Project Tool Integration** feature in Chordium is designed to seamlessly connect your development workflow across three essential layers:

1. Git Provider (e.g., GitHub, GitLab)  
2. LENS Project Module  
3. Developer Machine (via Chordium CLI)

This setup enables end-to-end visibility, traceability, and automation from product planning to code deployment — all without leaving your existing tools.

---

## Step 1: Connect Git Provider to LENS Project Module

The first step is to establish a connection between your Git provider and the LENS Project module.

**What this enables:**

- Map repositories with projects
- Initiate Repository creation from LENS

**Supported Git providers:**

- GitHub (At Present)

---

## Step 2: Link LENS Projects to Developer Machines (via Chordium CLI)

Once your Git repositories are linked to LENS Projects, the next step is to bring developers into the loop using the Chordium CLI.

**What this enables:**

- Developers can fetch assigned tasks and see project context directly in their terminal  
- Branches and commits can be auto-associated with product work items  
- Sync multiple projects locally without manual setup

**Benefits:**

- No need to switch between PM tools and Git manually  
- Reduced onboarding time for new developers  
- Developers stay focused

---

## How It Works Together

```text
   [Git Provider] ───▶ [LENS Project Module] ───▶ [Developer Machine via Chordium CLI]
       ▲                                                │
       │                                                ▼
   Commits, PRs ◀──── Context-aware Branches, Tasks ◀── Developers

