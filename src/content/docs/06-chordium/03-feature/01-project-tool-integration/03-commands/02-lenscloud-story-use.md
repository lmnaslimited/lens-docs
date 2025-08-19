---
title: Manual - Using lenscloud story use
description: Select and activate a specific story or feature from your current LENS Project.
---

The `lenscloud story use` command lets you select a **specific story** from your currently active LENS Project.  
Chordium will automatically **create a Git branch** for the story if it doesn’t already exist.

---

### Prerequisites

- You must have set an active project using [lenscloud project use](../../02-configuring-nectar-with-dev).
- Git Personal Access Token with permission to create branches in the project repository.
- The story/task should already exist in Nectar and be linked to your project.

---

### Running the Command

```bash
lenscloud story use
```

When you run this command, Chordium will:

- Check your current active project.

- Fetch the list of stories assigned to that project from Nectar.

- Prompt you to select one.

🔹 Selecting a Story

Once you choose a story:

- If the branch doesn’t exist locally:
    Chordium will create a new branch with a standardized naming format (e.g., story-US-2025-0700).

- If the branch exists locally:
    Chordium will switch to the branch.

```text
          +-------------------+
          | Nectar Project(s) |
          +-------------------+
                    |
                    v
   [lenscloud project use] → Set Active Project → Clone/Pull Repo
                    |
                    v
   [lenscloud story use] → Select Story → Create/Switch Branch
                    |
                    v
             Start Development

```