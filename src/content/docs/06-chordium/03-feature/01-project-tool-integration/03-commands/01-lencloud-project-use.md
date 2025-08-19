---
title: Command - lenscloud project use
description: Select and switch to a LENS Project on your developer machine using Chordium.
---

The `lenscloud project use` command lets you select and switch to a **LENS Project** from Nectar and set it as your active project on your developer machine.  

If the project’s repository is not already on your machine, Chordium will **clone it automatically**. If it exists, it will **pull the latest changes**.

---

### Prerequisites

- You must have completed the [lenscloud config](../../02-configuring-nectar-with-dev) setup.
- Git Personal Access Token with access to the project repositories.
- Network access to your Nectar instance and Git provider.

---

### Running the Command

```bash
lenscloud project use
```

When you run the command, Chordium will:

- Fetch the list of available projects from Nectar that has Repo.

- Display your current active project (if any).

- Prompt you to select a project from the list.

### How it Works

🔹 Selecting a Project

Once you choose a project:

- If not cloned:
    Chordium will clone the repository into your default projects directory.

- If already cloned:
    Chordium will run a git pull to ensure your local copy is up-to-date.


```text
          +-------------------+
          | Nectar Project(s) |
          +-------------------+
                    |
                    v
   [lenscloud project use] → Set Active Project → Clone/Pull Repo
```